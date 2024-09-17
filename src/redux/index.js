import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import getUserReducer from './getUserSlice'

const store = configureStore({
    reducer:{
        user:userReducer,
        getUser:getUserReducer
        
        
    }
})

export default store