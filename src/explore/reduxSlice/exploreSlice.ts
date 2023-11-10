import { createSlice } from "@reduxjs/toolkit";

import { ControlSetItem } from "src/interfaces/explore.interface";

export interface ExploreState {
    controls: ControlSetItem[];
    form_data: Record<string, unknown>;
}

const initialState: ExploreState = {
    controls: [],
    form_data: {},
};

export const controlSlice = createSlice({
    name: "explore",
    initialState,
    reducers: {
        setExploreControls: (state, action) => {
            const actionControls = action.payload;
            return { ...state, controls: { ...state.controls, ...actionControls } };
        },
        setFormData: (state, action) => {
            const formData = action.payload;
            console.log("formData", formData);
            return state;
        },
    },
});

export const { setExploreControls, setFormData } = controlSlice.actions;

export default controlSlice.reducer;
