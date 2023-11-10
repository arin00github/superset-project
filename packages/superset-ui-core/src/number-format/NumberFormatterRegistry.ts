import { OverwritePolicy, RegistryWithDefaultKey } from "../models";
import NumberFormatter from "./NumberFormatter";

export default class NumberFormatterRegistry extends RegistryWithDefaultKey<
    NumberFormatter,
    NumberFormatter
> {
    constructor() {
        super({
            name: "NumberFormatter",
            overwritePolicy: OverwritePolicy.WARN,
        });
    }
}
