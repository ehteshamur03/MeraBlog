import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null, // Make sure this contains logged-in user's info
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData; // Ensure payload contains user data with userId
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
