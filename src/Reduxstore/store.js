import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../Slices/cartslice'

export const store = configureStore({
  reducer: {
    cart:cartReducer
  },
})