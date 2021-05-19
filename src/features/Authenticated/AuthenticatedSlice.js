import { createSlice } from "@reduxjs/toolkit";
import localStorageService from '../../services/localStorageService';


export const authenticatedSlice = createSlice({
    name: "authenticated",
    initialState: {
        isAuthenticated: localStorageService.getToken(),
        role: localStorageService.getRole()
    },
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        }
    }
});

export const { setIsAuthenticated, setRole } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;