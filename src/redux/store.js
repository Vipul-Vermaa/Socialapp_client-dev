import {configureStore} from '@reduxjs/toolkit'
import { profileReducer, userReducer } from './reducers/userReducer'
import { postReducer } from './reducers/postReducer'

const store=configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        post:postReducer,
    }
})

export default store

export const server='https://social-app-server-xgik.onrender.com/api/v1'