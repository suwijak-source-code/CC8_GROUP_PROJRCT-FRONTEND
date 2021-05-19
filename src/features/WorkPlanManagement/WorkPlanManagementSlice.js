import { createSlice } from "@reduxjs/toolkit";


export const workPlanManagementSlice = createSlice({
    name: "workPlanManagement",
    initialState: {
        gardener: [],
        assignments: [],
        eachJob: {},
        eachAssign: {}
    },
    reducers: {
        setGardener: (state, action) => {
            state.gardener = action.payload;
        },
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        setEachJob: (state, action) => {
            state.eachJob = action.payload;
        },
        setEachAssign: (state, action) => {
            state.eachAssign = action.payload;
        },
    }
});

export const { setGardener, setAssignments, setEachJob, setEachAssign } = workPlanManagementSlice.actions;

export default workPlanManagementSlice.reducer;