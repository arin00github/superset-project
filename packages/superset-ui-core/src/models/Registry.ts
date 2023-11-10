export enum OverwritePolicy {
    ALLOW = "ALLOW",
    PROHIBIT = "PROHIBIT",
    WARN = "WARN",
}

interface ItemWithValue<T> {
    value: T;
}

interface ItemWithLoader<T> {
    loader: () => T;
}

/**
 * Type of value returned from loader function when using registerLoader()
 */
type InclusiveLoaderResult<V> = V | Promise<V>;

export type RegistryValue<V, W extends InclusiveLoaderResult<V>> = V | W | undefined;

export type RegistryEntry<V, W extends InclusiveLoaderResult<V>> = {
    key: string;
    value: RegistryValue<V, W>;
};

/**
 * A listener is called whenever a registry's entries change.
 * Keys indicates which entries been affected.
 */
export type Listener = (keys: string[]) => void;

export interface RegistryConfig {
    name?: string;
    overwritePolicy?: OverwritePolicy;
}

/**
 * @class Registry
 * @description Registry is a key-value store that allows for registering and retrieving
 */
export default class Registry<V, W extends InclusiveLoaderResult<V> = InclusiveLoaderResult<V>> {
    name: string;

    /**
     * @type {OverwritePolicy} overwritePolicy
     * @description The overwrite policy for the registry
     */
    overwritePolicy: OverwritePolicy;

    /**
     * @type {Object} items
     * @description The key-value store for registered items
     */
    items: {
        [key: string]: ItemWithValue<V> | ItemWithLoader<W>;
    };

    /**
     * @description The key-value store for registered promises
     */
    promises: {
        [key: string]: Promise<V>;
    };

    listeners: Set<Listener>;

    /**
     * Create Registry
     * @param {RegistryConfig} config configuration object
     */
    constructor(config: RegistryConfig = {}) {
        const { name = "", overwritePolicy = OverwritePolicy.ALLOW } = config;
        this.name = name;
        this.overwritePolicy = overwritePolicy;
        this.items = {};
        this.promises = {};
        this.promises = {};
        this.listeners = new Set();
    }

    /**
     *
     * @param key key of the item
     * @returns {boolean} whether the item is registered
     */
    has(key: string) {
        const item = this.items[key];
        return item !== null && item !== undefined;
    }

    /**
     * @method get
     * @param key key of the item
     * @returns {V | W | undefined} the item
     */
    get(key: string): V | W | undefined {
        const item = this.items[key];
        if (item === undefined) {
            return undefined;
        }
        if ("loader" in item) {
            return item.loader();
        }

        return item.value;
    }

    /**
     * @method getAsPromise
     * @param key key of the item
     * @description If the item is registered, return a promise that resolves to the item.
     * @returns
     */
    getAsPromise(key: string): Promise<V> {
        const promise = this.promises[key];

        if (typeof promise !== "undefined") {
            return promise;
        }

        const item = this.get(key);
        if (item !== undefined) {
            const newPromise = Promise.resolve(item) as Promise<V>;
            this.promises[key] = newPromise;
            return newPromise;
        }

        return Promise.reject<V>(new Error(`Item with key "${key}" is not registered.`));
    }

    getMap() {
        return this.keys().reduce<{
            [key: string]: RegistryValue<V, W>;
        }>((prev, key) => {
            const map = prev;
            map[key] = this.get(key);
            return map;
        }, {});
    }

    keys(): string[] {
        return Object.keys(this.items);
    }

    values(): RegistryValue<V, W>[] {
        return this.keys().map((key) => this.get(key));
    }

    valuesAsPromise(): Promise<V[]> {
        return Promise.all(this.keys().map((key) => this.getAsPromise(key)));
    }

    entries(): RegistryEntry<V, W>[] {
        return this.keys().map((key) => ({ key, value: this.get(key) }));
    }

    entriesAsPromise(): Promise<{ key: string; value: V }[]> {
        const keys = this.keys();
        return this.valuesAsPromise().then((values) => {
            return values.map((value, idx) => ({
                key: keys[idx],
                value,
            }));
        });
    }

    addListener(listener: Listener) {
        this.listeners.add(listener);
    }

    removeListener(listener: Listener) {
        this.listeners.delete(listener);
    }

    private notifyListeners(keys: string[]) {
        this.listeners.forEach((listener) => {
            try {
                listener(keys);
            } catch (error) {
                console.error("Exception thrown from a registry listener:", error);
            }
        });
    }

    remove(key: string) {
        const isChange = this.has(key);
        delete this.items[key];
        delete this.promises[key];
        if (isChange) {
            this.notifyListeners([key]);
        }
        return this;
    }

    clear() {
        const keys = this.keys();
        this.items = {};
        this.promises = {};
        this.notifyListeners(keys);
        return this;
    }

    /**
     * @method registerValue
     * @param {string} key key of the item
     * @param {V} value value of the item
     * @description Register an item with a key and a value
     * @returns
     */
    registerValue(key: string, value: V) {
        const item = this.items[key];
        const willOverwrite =
            this.has(key) && (("value" in item && item.value !== value) || "loader" in item);
        if (willOverwrite) {
            if (this.overwritePolicy === OverwritePolicy.WARN) {
                console.warn(
                    `Item with key "${key}" already exists. You are assigning a new value.`,
                );
            } else if (this.overwritePolicy === OverwritePolicy.PROHIBIT) {
                throw new Error(`Item with key "${key}" already exists.`);
            }
        }

        if (!item || willOverwrite) {
            this.items[key] = { value };
            delete this.promises[key];
            this.notifyListeners([key]);
        }

        return this;
    }

    /**
     * @method registerLoader
     * @description Register an item with a key and a loader function
     * @param {string} key key of the item
     * @param {Function} loader loader function
     * @returns
     */
    registerLoader(key: string, loader: () => W) {
        const item = this.items[key];
        const willOverwrite =
            this.has(key) && (("loader" in item && item.loader !== loader) || "loader" in item);

        if (willOverwrite) {
            if (this.overwritePolicy === OverwritePolicy.WARN) {
                console.warn(
                    `Item with key "${key}" already exists. You are assigning a new value.`,
                );
            } else if (this.overwritePolicy === OverwritePolicy.PROHIBIT) {
                throw new Error(`Item with key "${key}" already exists.`);
            }
        }
        if (!item || willOverwrite) {
            this.items[key] = { loader };
            delete this.promises[key];
            this.notifyListeners([key]);
        }

        return this;
    }
}
