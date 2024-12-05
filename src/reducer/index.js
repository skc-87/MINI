import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../slices/profileSlice.js"
const rootReducer = combineReducers({
   
    profile: profileReducer,
   
})

export default rootReducer;