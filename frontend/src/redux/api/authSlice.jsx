import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    name: "",
    email: "",
    token: "",
    session: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const userData = action.payload;

            if (!userData) {
                state.user = null;
                state.name = "";
                state.email = "";
                state.token = "";
                state.session = null;

                localStorage.removeItem("user");
                localStorage.removeItem("token");
                return;
            }

            const user = userData.user || userData;

            state.user = user;
            state.name = user.name || user.user_metadata?.name || "";
            state.email = user.email || user.user_metadata?.email || "";

            state.token =
                userData.token ||
                userData.access_token ||
                userData.session?.access_token ||
                "";

            state.session = userData.session || null;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", state.token);
        },

        logOutUser: (state) => {
            state.user = null;
            state.name = "";
            state.email = "";
            state.token = "";
            state.session = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },

        restoreUserFromStorage: (state) => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                const parsedUser = JSON.parse(storedUser);
                state.user = parsedUser;
                state.token = storedToken;
                state.name = parsedUser.name || "";
                state.email = parsedUser.email || "";
            }
        },
    },
});

export const { setUser, logOutUser, restoreUserFromStorage } =
    authSlice.actions;

export default authSlice.reducer;
