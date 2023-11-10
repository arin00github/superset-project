import { useAppDispatch } from "../../store";
import {} from "@reduxjs/toolkit";
import { setExploreControls } from "../reduxSlice/exploreSlice";

export const HydrateExplore = () => {
    const dispatch = useAppDispatch();

    dispatch(setExploreControls({ payload: {}, type: "explore/setExploreControls" }));

    return null;
};
