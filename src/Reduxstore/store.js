import { configureStore } from '@reduxjs/toolkit'

import categoriesReducer from '../Slices/categoryslice'
export const store = configureStore({
  reducer: {
    // cart:cartReducer,
    categories:categoriesReducer
  },
  
})