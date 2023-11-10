export interface NumberFormatterConfig {
    id: string;
    label: string;
    formatFunc: (value: number) => string;
}

interface NumberFormatterInterface {
    format(value: number | null | undefined): string;
}

class NumberFormatter implements NumberFormatterInterface {
    constructor(config: NumberFormatterConfig) {
        const { id, label, formatFunc } = config;
        this.id = id;
        this.label = label;
        this.formatFunc = formatFunc;
    }

    private id: string;
    private label: string;
    public formatFunc: (value: number) => string;

    format(value: number | null | undefined) {
        if (value === null || value === undefined || Number.isNaN(value)) {
            return "";
        }

        if (value === Number.POSITIVE_INFINITY) {
            return "∞";
        }
        return this.formatFunc(value);
    }
}

export default NumberFormatter;
