import { createSlice } from "@reduxjs/toolkit";
import localStorageService from '../../services/localStorageService';


export const authenticatedSlice = createSlice({
    name: "authenticated",
    initialState: {
        isAuthenticated: localStorageService.getToken()
    },
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
});

export const { setIsAuthenticated } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;