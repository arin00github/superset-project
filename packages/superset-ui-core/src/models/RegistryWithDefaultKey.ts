import Registry, { RegistryConfig } from "./Registry";

interface RegistryWithDefaultKeyConfig extends RegistryConfig {
    initialDefaultKey?: string;
    setFirstItemAsDefault?: boolean;
}

export default class RegistryWithDefaultKey<
    V,
    W extends V | Promise<V> = V | Promise<V>,
> extends Registry<V, W> {
    initialDefaultKey?: string;

    defaultKey?: string;

    setFirstItemAsDefault: boolean;

    constructor(config: RegistryWithDefaultKeyConfig = {}) {
        super(config); // 상속받은 Registry의 constructor를 호출한다.
        const { initialDefaultKey = undefined, setFirstItemAsDefault = false } = config;
        this.initialDefaultKey = initialDefaultKey;
        this.defaultKey = initialDefaultKey;
        this.setFirstItemAsDefault = setFirstItemAsDefault;
    }

    clear() {
        super.clear();
        this.defaultKey = this.initialDefaultKey;
        return this;
    }

    get(key?: string) {
        const targetKey = key ?? this.defaultKey;
        return targetKey ? super.get(targetKey) : undefined;
    }

    registerValue(key: string, value: V) {
        super.registerValue(key, value);
        if (this.setFirstItemAsDefault && !this.defaultKey) {
            this.defaultKey = key;
        }
        return this;
    }

    registerLoader(key: string, loader: () => W) {
        super.registerLoader(key, loader);
        if (this.setFirstItemAsDefault && !this.defaultKey) {
            this.defaultKey = key;
        }
        return this;
    }

    getDefaultKey() {
        return this.defaultKey;
    }

    setDefaultKey(key: string) {
        this.defaultKey = key;
        return this;
    }

    clearDefaultKey() {
        this.defaultKey = undefined;
        return this;
    }
}
