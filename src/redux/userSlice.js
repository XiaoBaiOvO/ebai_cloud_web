import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: "",
        userName: "",
        userAvatar: "",
        userData: {},
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserAvatar: (state, action) => {
            state.userAvatar = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    }
});

export const {setUserId, setUserName, setUserAvatar, setUserData} = userSlice.actions;
export default userSlice.reducer;
