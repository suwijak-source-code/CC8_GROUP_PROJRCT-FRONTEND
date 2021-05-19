import { createSlice } from "@reduxjs/toolkit";


export const processManagementSlice = createSlice({
    name: "processManagement",
    initialState: {
        farmManagement: true,
        seedManagement: false,
        plantingManagement: false
    },
    reducers: {
        setFarmManagement: (state, action) => {
            state.farmManagement = action.payload;
        },
        setSeedManagement: (state, action) => {
            state.seedManagement = action.payload;
        },
        setPlantingManagement: (state, action) => {
            state.plantingManagement = action.payload;
        }
    }
});

export const { setFarmManagement, setSeedManagement, setPlantingManagement } = processManagementSlice.actions;

export default processManagementSlice.reducer;