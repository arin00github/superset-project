// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonObject = { [member: string]: any };
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type JsonArray = JsonValue[];

export type MenuType = {
    path: string;
    label: string;
    id: string;
};
