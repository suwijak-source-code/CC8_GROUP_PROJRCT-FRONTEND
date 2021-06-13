import { createSlice } from "@reduxjs/toolkit";


export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        userProfile: {},
        editEmployeeProfile: {},
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setEditEmployeeProfile: (state, action) => {
            state.editEmployeeProfile = action.payload;
        }
    }
});

export const { setUserProfile, setEditEmployeeProfile } = profileSlice.actions;

export default profileSlice.reducer;