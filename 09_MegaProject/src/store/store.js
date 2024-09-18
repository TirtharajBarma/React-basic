import {configureStore} from '@reduxjs/toolkit'
import authSizeReducer from './authSlice'

const store = configureStore({
    reducer: {
        auth: authSizeReducer
    }   
})

export default store