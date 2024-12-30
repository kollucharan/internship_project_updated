import { configureStore } from '@reduxjs/toolkit'
import countReducer from '../Slices/countslice'
import categoriesReducer from '../Slices/categoryslice'
export const store = configureStore({
  reducer: {
    // cart:cartReducer,
    categories:categoriesReducer,
    count:countReducer
  },
  
})