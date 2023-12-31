export default class ExtensibleFunction extends Function {
    constructor(fn: (...args: unknown[]) => unknown) {
        super();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, no-constructor-return
        return Object.setPrototypeOf(fn, new.target.prototype);
    }
}
