import { createSlice } from "@reduxjs/toolkit";


export const paginateSlice = createSlice({
    name: "paginate",
    initialState: {
        currentPage: 1,
        listPerPage: 5,
        pageNumber: []
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setListPerPage: (state, action) => {
            state.listPerPage = action.payload;
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        }
    }
});

export const { setCurrentPage, setListPerPage, setPageNumber } = paginateSlice.actions;

export default paginateSlice.reducer;