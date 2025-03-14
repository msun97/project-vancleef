import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inquiryData: JSON.parse(localStorage.getItem('inquiryData')) || []
};
export const ccinquirySlice = createSlice({
    name: "inquiry",
    initialState,
    reducers: {
        addInquiry: (state, action) => {
            const no = state.inquiryData.length + 1 
            const addData = {...action.payload, id : no};
            state.inquiryData = [...state.inquiryData, addData];
            localStorage.setItem('inquiryData', JSON.stringify(state.inquiryData));
        },
}});    

export const inquiryActions = ccinquirySlice.actions;

export default ccinquirySlice.reducer;
