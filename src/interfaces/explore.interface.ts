import { ReactNode } from "react";
import { JsonValue } from "./common";

export type InternalControlType =
    | "CheckboxControl"
    | "SelectControl"
    | "TextControl"
    | "MetricsControl"
    | "VizTypeControl"
    | "AdhocFilterControl"
    | "MetricsControl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ControlType = InternalControlType | React.ComponentType<any>;

export type TabOverride = "data" | "customize" | boolean;

export interface ControlPanelState {
    form_data: Record<string, unknown>;
    datasource: Record<string, unknown> | null;
    controls: ControlSetItem[];
}

export interface BaseControlConfig<T extends ControlType = ControlType, V = JsonValue> {
    type: T;
    label: ReactNode;
    description?: ReactNode;
    default?: V;
    value?: V;
    renderTrigger?: boolean;
    warning?: ReactNode;
    sholdMapStateToProps?: (prevState: ControlPanelState, state: ControlPanelState) => boolean;
    mapStateToProps?: (
        state: ControlPanelState,
        chartState?: Record<string, unknown>,
    ) => Record<string, unknown>;
    visibility?: (props: ControlPanelState) => boolean;
}

export type CustomControlItem = {
    name: string;
    config: BaseControlConfig<ControlType, JsonValue>;
};

export type ControlSetItem = CustomControlItem;

export type ControlSetRow = ControlSetItem[];

export type ControlPanelSectionConfig = {
    name: string;
    tabOverride?: boolean;
    expanded?: boolean;
    controlRows: ControlSetRow[];
};
