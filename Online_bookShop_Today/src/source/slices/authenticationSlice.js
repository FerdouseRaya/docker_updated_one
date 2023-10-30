import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticate: false,
    loading: false,
    error: null,
    formType :'login'

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticate = true;
            state.loading = false;
            state.error = null

        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticate = false;
            state.loading = false;
            state.error = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        toggleFormType: (state) => {
            // Toggle between login and sign-up forms
            state.formType = state.formType === 'login' ? 'signup' : 'login';
          },
          registerUserSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticate = true;
            state.loading = false;
            state.error = null;
            state.registrationSuccess = true; // Set registration success to true
          },
      
          registerUserFailure: (state, action) => {
            state.user = null;
            state.isAuthenticate = false;
            state.loading = false;
            state.error = action.payload;
            state.registrationSuccess = false; // Set registration success to false
          },

    }
})
export const { setUser, clearUser, setLoading, setError,toggleFormType,registerUserSuccess,registerUserFailure } = authSlice.actions;
export default authSlice.reducer;