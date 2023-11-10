import { ControlPanelSectionConfig } from "src/interfaces/explore.interface";

export const datasourceAndVizType: ControlPanelSectionConfig = {
    name: "datasourceAndVizType",
    controlRows: [
        [
            {
                name: "slice_id",
                config: {
                    type: "TextControl",
                    label: "Slice ID",
                },
            },
        ],
    ],
};
