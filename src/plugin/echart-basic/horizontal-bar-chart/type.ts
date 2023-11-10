import { ComposeOption } from "echarts/core";
import type {
    AxisPointerComponentOption,
    DataZoomComponentOption,
    DatasetComponentOption,
    GridComponentOption,
    LegendComponentOption,
    SingleAxisComponentOption,
    TooltipComponentOption,
} from "echarts/components";
import type { BarSeriesOption } from "echarts/charts";
import { LabelOptions, LegendOptions, QueryFormData } from "../../type";

/**
 * @name ECOption
 * @description ECharts 옵션 타입 설정
 */
export type ECOption = ComposeOption<
    | BarSeriesOption
    | DatasetComponentOption
    | LegendComponentOption
    | GridComponentOption
    | SingleAxisComponentOption
    | TooltipComponentOption
    | DataZoomComponentOption
    | AxisPointerComponentOption
>;

export type CustomQueryFormData = LegendOptions & LabelOptions & QueryFormData;

export type ChartComponentProps = {
    echartOptions: ECOption;
    width: number;
    height: number;
};
