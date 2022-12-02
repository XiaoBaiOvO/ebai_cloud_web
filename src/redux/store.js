import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import testReducer from "./testReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        test: testReducer
    }
});

export default store;
