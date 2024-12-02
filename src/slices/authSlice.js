// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     signupData: null,
//     loading: false,
//     token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,


// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState: initialState,
//     reducers: {
//         setSignupData(state, value) {
//             state.signupData = value.payload;
//         },
//         setLoading(state, value) {
//             state.loading = value.payload
//         },
//         setToken(state, value) {
//             state.token = value.payload
//         }
//     },
// });

// export const { setToken,setSignupData,setLoading, token } = authSlice.actions;
// export default authSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

// Helper function to decode JWT payload
function decodeJWT(token) {
    if (!token) return null;
    try {
        const base64Url = token.split(".")[1]; // Extract the payload section
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join("")
        );
        return JSON.parse(jsonPayload); // Parse and return the payload as JSON
    } catch (error) {
        console.error("Invalid JWT format:", error);
        return null;
    }
}

// Initial state
const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") || null, // Raw token from localStorage
    user: decodeJWT(localStorage.getItem("token")), // Decoded user info
};

// Create the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            const token = action.payload;
            state.token = token;
            state.user = decodeJWT(token); // Decode and set user info
            localStorage.setItem("token", token); // Save token to localStorage
        },
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token"); // Clear token from localStorage
        },
    },
});

// Export actions and the reducer
export const { setSignupData, setLoading, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
