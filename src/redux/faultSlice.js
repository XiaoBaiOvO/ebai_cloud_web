import {createSlice} from "@reduxjs/toolkit";

const faultSlice = createSlice({
    name: "fault",
    initialState: {
        alarms: {},
        events: []
    },
    reducers: {
        setAlarms: (state, action) => {
            state.alarms = action.payload;
        },
        clearAlarm: (state, action) => {
            if (state.alarms.hasOwnProperty(action.payload.id)) {
                delete state.alarms[action.payload.id];
            }
        },
        addAlarm: (state, action) => {
            state.alarms[action.payload.id] = action.payload;
        },
        addEvent: (state, action) => {
            state.events.push(action.payload);
        },
        setEvents: (state, action) => {
            state.events = action.payload;
        },
    }
});

export const {setAlarms, setEvents, clearAlarm, addAlarm, addEvent} = faultSlice.actions;
export default faultSlice.reducer;
