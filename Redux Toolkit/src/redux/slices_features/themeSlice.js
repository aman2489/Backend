import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: "light"
    },
    reducers: {
        changeThemeToLight: (state) => {
            state.value = "light"
        },
        changeThemeToDark: (state) => {
            state.value = "dark"
        }
    }
})

export const {changeThemeToDark, changeThemeToLight} = themeSlice.actions

export default themeSlice.reducer