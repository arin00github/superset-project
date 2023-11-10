import { SingleAxisComponentOption } from "echarts/components";

/**
 * @name xAxisOption
 * @description x축 옵션 타입 설정
 */
export type xAxisOption = SingleAxisComponentOption & {
    mainType?: "xAxis";
};
/**
 * @name yAxisOption
 * @description y축 옵션 타입 설정
 */
export type yAxisOption = SingleAxisComponentOption & {
    mainType?: "yAxis";
};

/**
 * @name LabelType
 * @enum {string}
 * @description 라벨 유형 열거형
 */
export enum LabelType {
    Key = "key",
    Value = "value",
    Percent = "percent",
    KeyValue = "key_value",
    KeyPercent = "key_percent",
    KeyValuePercent = "key_value_percent",
}

/**
 * @description 라벨 유형 선택지 배열
 * @type {Array<[LabelType, string]>}
 */
export const labeltypeChoices = [
    [LabelType.Key, "Category Name"],
    [LabelType.Value, "Value"],
    [LabelType.Percent, "Percentage"],
    [LabelType.KeyValue, "Category and Value"],
    [LabelType.KeyPercent, "Category and Percentage"],
    [LabelType.KeyValuePercent, "Category, Value and Percentage"],
];

/**
 * @name ChartSortType
 * @enum {string}
 * @description 차트 정렬 유형 열거형
 */
export enum ChartSortType {
    Default = "default",
    Ascending_Value = "ascending-value",
    Decending_Value = "decending-value",
    Ascending_Column = "ascending-column",
    Decending_Column = "decending-column",
}

/**
 * @description 차트 정렬 유형 선택지 배열
 * @type {Array<[ChartSortType, string]>}
 */
export const sortTypeChoices = [
    [ChartSortType.Default, "No Sort"],
    [ChartSortType.Ascending_Column, "Ascending-Column"],
    [ChartSortType.Decending_Column, "Decending-Column"],
    [ChartSortType.Ascending_Value, "Ascending-Value"],
    [ChartSortType.Decending_Value, "Decending-Value"],
];

/**
 * @name LegendPosition
 * @enum {string}
 * @description 범례 위치 열거형
 */
export enum LegendPosition {
    Top_Left = "top-left",
    Top_Right = "top-right",
    Top_Center = "top-center",
    Bottom_Left = "bottom-left",
    Bottom_Right = "bottom-right",
    Bottom_Center = "bottom-center",
    Middle_Right = "middle-right",
    Middle_Left = "middle-left",
}

/**
 * @description 범례 위치 선택지 배열
 * @type {Array<[LegendPosition, string]>}
 */
export const legendPositionChoices = [
    [LegendPosition.Top_Left, "Top Left"],
    [LegendPosition.Top_Right, "Top Right"],
    [LegendPosition.Top_Center, "Top Center"],
    [LegendPosition.Bottom_Left, "Bottom Left"],
    [LegendPosition.Bottom_Right, "Bottom Right"],
    [LegendPosition.Bottom_Center, "Bottom Center"],
    [LegendPosition.Middle_Left, "Middle Left"],
    [LegendPosition.Middle_Right, "Middle Right"],
];

export enum LabelPosition {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right",
    inside = "inside",
    insideLeft = "insideLeft",
    insideRight = "insideRight",
    insideTop = "insideTop",
    insideBottom = "insideBottom",
    insideTopLeft = "insideTopLeft",
    insideBottomLeft = "insideBottomLeft",
    insideTopRight = "insideTopRight",
    insideBottomRight = "insideBottomRight",
}

export const labelPositionChoices = [
    [LabelPosition.top, "Top"],
    [LabelPosition.bottom, "Bottom"],
    [LabelPosition.left, "Left"],
    [LabelPosition.right, "Right"],
    [LabelPosition.inside, "Inside"],
    [LabelPosition.insideLeft, "Inside Left"],
    [LabelPosition.insideRight, "Inside Right"],
    [LabelPosition.insideTop, "Inside Top"],
    [LabelPosition.insideBottom, "Inside Bottom"],
    [LabelPosition.insideTopLeft, "Inside Top Left"],
    [LabelPosition.insideBottomLeft, "Inside Bottom Left"],
    [LabelPosition.insideTopRight, "Inside Top Right"],
    [LabelPosition.insideBottomRight, "Inside Bottom Right"],
];

/**
 * @enum {string} legendOrient
 * @description 범례 방향 열거형
 */
export enum LegendOrient {
    Horizontal = "horizontal",
    Vertiacal = "vertical",
}

/**
 * @description 범례 방향 선택지 배열
 * @type {Array<[legendOrient, string]>}
 */
export const orientChoices = [
    [LegendOrient.Horizontal, "Horizontal"],
    [LegendOrient.Vertiacal, "Vertical"],
];

/**
 * @name LegendConfig
 * @description 범례 설정 데이터 타입
 */
export type LegendConfig = {
    name: string;
    value: string;
};

/**
 * @type legendOptions
 * @description 범례 옵션 인터페이스
 */
export type LegendOptions = {
    showLegend: boolean;
    legendPosition: LegendPosition;
    legendConfig: LegendConfig[];
    legendOrient: LegendOrient;
};

/**
 * @type xAxisMainOptions
 * @description x축 옵션 인터페이스
 */
export type XAxisMainOptions = {
    xMax?: number;
    xMin?: number;
    xInterval?: number;
    xAxisLabel: boolean;
    xAxisLine: boolean;
    xTickFormat: string;
};

/**
 * @type yAxisMainOptions
 * @description y축 옵션 인터페이스
 */
export type YAxisMainOptions = {
    yMax?: number;
    yMin?: number;
    yInterval?: number;
    yAxisLabel: boolean;
    yAxisLine: boolean;
    yTickFormat: string;
};

/**
 * @type labelOptions
 * @description 라벨 옵션 인터페이스
 */
export type LabelOptions = {
    showLabel: boolean;
    labelType: LabelType;
    labelPosition: LabelPosition;
    labelFormat: string;
};

export declare type Aggregate = "AVG" | "COUNT" | "COUNT_DISTINCT" | "MAX" | "MIN" | "SUM";
export interface QueryFormMetric {
    label: string;
    agrregate: Aggregate;
    hasCustomLabel?: boolean;
}

export interface QueryFormColumn {
    label: string;
    hasCustomLabel?: boolean;
}

export interface QueryFormData {
    metrics: QueryFormMetric[];
    groupby: QueryFormColumn[];
    series?: string;
}
