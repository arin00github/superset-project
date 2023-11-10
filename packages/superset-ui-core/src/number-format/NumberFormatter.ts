import { NumberFormatFunction } from "./types";

export const PREVIEW_VALUE = 12345.432;

export interface NumberFormatterConfig {
    id: string;
    label?: string;
    description?: string;
    formatFunc?: NumberFormatFunction;
    isInvalid?: boolean;
}

class NumberFormatter {
    id: string;
    label: string;
    description: string;
    formatFunc: NumberFormatFunction;
    isInvalid: boolean;

    constructor(config: NumberFormatterConfig) {
        // super((value: number) => this.format(value));

        const {
            id = "isRequired",
            label,
            description = "",
            formatFunc = () => "config.formatFunc",
            isInvalid = false,
        } = config;

        this.id = id;
        this.label = label ?? id;
        this.description = description;
        this.formatFunc = formatFunc;
        this.isInvalid = isInvalid;
    }

    format(value: number | null | undefined) {
        if (value === null || value === undefined || Number.isNaN(value)) {
            return `${value}`;
        }
        if (value === Number.POSITIVE_INFINITY) {
            return "∞";
        }
        if (value === Number.NEGATIVE_INFINITY) {
            return "-∞";
        }

        return this.formatFunc(value);
        //return this.formatFunc(value ?? 0);
    }

    preview(value = PREVIEW_VALUE) {
        return `${value} => ${this.format(value)}`;
    }
}

export default NumberFormatter;
