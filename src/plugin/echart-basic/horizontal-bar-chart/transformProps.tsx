import { BarSeriesOption } from "echarts/charts";
import {
    LabelPosition,
    LabelType,
    LegendOrient,
    LegendPosition,
    QueryFormColumn,
    xAxisOption,
    yAxisOption,
} from "../../type";
import { CustomQueryFormData, ECOption } from "./type";

const transFormData: CustomQueryFormData = {
    legendOrient: LegendOrient.Horizontal,
    legendPosition: LegendPosition.Top_Center,
    legendConfig: [{ name: "category", value: "범례2" }],
    showLegend: true,
    showLabel: true,
    labelPosition: LabelPosition.inside,
    labelType: LabelType.Value,
    labelFormat: "",
    metrics: [{ label: "count", agrregate: "SUM" }],
    groupby: [{ label: "category" }],
};

type CustomData = Record<string, unknown>;

const initialData: CustomData[] = [
    { category: "Americano", count: 820 },
    { category: "Caffe Latte", count: 932 },
    { category: "Cappuccino", count: 901 },
    { category: "Caramel Macchiato", count: 934 },
    { category: "Espresso", count: 1290 },
];

const getColumnLabel = (column: QueryFormColumn) => {
    return column.label;
};

const getMetricLabel = (metric: QueryFormColumn) => {
    return metric.label;
};

const TransformProps = () => {
    const {
        legendOrient,
        legendPosition,
        showLegend,
        showLabel,
        labelFormat,
        labelPosition,
        labelType,
        legendConfig,
        metrics,
        groupby,
    } = transFormData as CustomQueryFormData;

    const metricLabels = metrics.map(getMetricLabel);
    const groupbyLabels = groupby.map(getColumnLabel);

    const firstMetricLabel = metricLabels[0];
    const firstGroupbyLabel = groupbyLabels[0];

    const echartData = initialData;

    /**
     * @constant xAxisOption
     * @description x축 옵션
     */
    const xAxisOption: xAxisOption = {
        type: "category",
        data: echartData.map((item) => item[firstGroupbyLabel]) as string[],
        //data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLabel: {
            show: true,
        },
        axisLine: {
            show: true,
        },
    };

    /**
     * @constant yAxisOption
     * @description y축 옵션
     */
    const yAxisOption: yAxisOption = {
        type: "value",
        axisLabel: {
            show: true,
        },
        axisLine: {
            show: true,
        },
    };

    const makeSeries = (): BarSeriesOption[] => {
        return metricLabels.map((metric) => {
            return {
                type: "bar",
                data: echartData.map((item) => item[metric] as number),
                label: {
                    show: showLabel,
                    position: labelPosition,
                },
            };
        });
    };

    const echartOptions: ECOption = {
        tooltip: {
            show: true,
        },
        xAxis: xAxisOption,
        yAxis: yAxisOption,
        series: [
            {
                type: "bar",
                label: {
                    show: showLabel,
                    position: labelPosition,
                },
            },
        ],
        legend: {
            show: showLegend,
            orient: legendOrient,
            top: legendPosition.split("_")[0],
            left: legendPosition.split("_")[1],
        },
    };

    return {
        echartOptions,
    };
};
export default TransformProps;
