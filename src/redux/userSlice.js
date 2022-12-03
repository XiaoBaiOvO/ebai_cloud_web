import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
        userName: null,
        userAvatar: null,
        userData: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userName = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserAvatar: (state, action) => {
            state.userName = action.payload;
        },
        setUserData: (state, action) => {
            state.userName = action.payload;
        },
    }
});

export const {setUserId, setUserName, setUserAvatar, setUserData} = userSlice.actions;
export default userSlice.reducer;
