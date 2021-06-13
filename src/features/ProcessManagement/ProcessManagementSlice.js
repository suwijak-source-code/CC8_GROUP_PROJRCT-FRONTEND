import { createSlice } from "@reduxjs/toolkit";


export const processManagementSlice = createSlice({
    name: "processManagement",
    initialState: {
        farmManagement: true,
        seedManagement: false,
        plantingManagement: false,
        eachFarm: {},
        allFarm: true,
        inProgressFarm: false,
        idleFarm: false,
        allPlanting: true,
        inProgressPlanting: false,
        harvestPlanting: false,
        finishPlanting: false,
        cancelPlanting: false,
        eachPlanting: {},
        plantingList: [],
        farmOpenAddPlanting: false
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
        },
        setEachFarm: (state, action) => {
            state.eachFarm = action.payload;
        },
        setAllFarm: (state, action) => {
            state.allFarm = action.payload;
        },
        setInProgressFarm: (state, action) => {
            state.inProgressFarm = action.payload;
        },
        setIdleFarm: (state, action) => {
            state.idleFarm = action.payload;
        },
        setAllPlanting: (state, action) => {
            state.allPlanting = action.payload;
        },
        setInProgressPlanting: (state, action) => {
            state.inProgressPlanting = action.payload;
        },
        setHarvestPlanting: (state, action) => {
            state.harvestPlanting = action.payload;
        },
        setFinishPlanting: (state, action) => {
            state.finishPlanting = action.payload;
        },
        setCancelPlanting: (state, action) => {
            state.cancelPlanting = action.payload;
        },
        setEachPlanting: (state, action) => {
            state.eachPlanting = action.payload;
        },
        setPlantingList: (state, action) => {
            state.plantingList = action.payload;
        },
        setFarmOpenAddPlanting: (state, action) => {
            state.farmOpenAddPlanting = action.payload;
        }
    }
});

export const { setFarmManagement, setSeedManagement, setPlantingManagement, setEachFarm,
    setAllFarm, setInProgressFarm, setIdleFarm, setAllPlanting, setInProgressPlanting, setHarvestPlanting,
    setFinishPlanting, setCancelPlanting, setEachPlanting, setPlantingList, setFarmOpenAddPlanting } = processManagementSlice.actions;

export default processManagementSlice.reducer;