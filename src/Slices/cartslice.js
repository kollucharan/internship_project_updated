// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     itemsincart: [],
//   };

// export const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//    addtocart: (state,action) => {
//     const existingProduct = state.itemsincart.find(item => item.id === action.payload.id);
//     if (existingProduct) {
//       existingProduct.quantity += 1; // If already in cart, increase the quantity
//     } else {
//       state.itemsincart.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
//     }  
//       },

//       removeFromCart: (state, action) => {
//         // Remove item by matching id
//         state.itemsincart = state.itemsincart.filter(item => item.id !== action.payload.id);
//       }
//      }
    
//     })
  
//   // Action creators are generated for each case reducer function
//   export const { addtocart,removeFromCart } = cartSlice.actions
  
//   export default cartSlice.reducer

import { createSlice} from '@reduxjs/toolkit';


const initialState = {
  itemsincart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtocart: (state, action) => {
      // Check if the product is already in the cart
      const existingItem = state.itemsincart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in the cart
      } else {
        state.itemsincart.push({ ...action.payload, quantity: 1 }); // Add new item to cart
      }
    },
    removeFromCart: (state, action) => {
      state.itemsincart = state.itemsincart.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addtocart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
