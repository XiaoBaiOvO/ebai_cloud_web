import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userName: null
    },
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        }
    }
});

export const {setUserName} = userSlice.actions;
export default userSlice.reducer;
