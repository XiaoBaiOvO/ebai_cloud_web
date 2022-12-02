import {createSlice} from "@reduxjs/toolkit";

const testReducer = createSlice({
    name: "test",
    initialState: {
        testString: "2",
    },
    reducers: {
        setTestString: (state, action) => {
            state.testString = action.payload;
        },
    }
});

export const {setTestString} = testReducer.actions;
export default testReducer.reducer;
