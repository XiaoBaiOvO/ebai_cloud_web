import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import faultReducer from "./faultSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        fault: faultReducer
    }
});

export default store;
