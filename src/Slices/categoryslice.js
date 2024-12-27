// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: [],
// };

// const userSlice = createSlice({
//   name: "userdetails",
//   initialState,
//   reducers: {
//     userlogin: (state, action) => {
//       state.user.push(action.payload);
//     },

//     userlogout: (state, action) => {
//       state.user = [];
//     },
//   },
// });

// export const { userlogin, userlogout } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
   categories:[],
   };
   const categoriesSlice = createSlice({
   name:"categories",
   initialState,
      reducers: {
     
        addtocategories:(state,action)=>{

          state.categories.push(action.payload)

        },
        removefromcategories:(state,action)=>{
        
          state.categories.filter((item)=>item!=action.payload)

        }

      }
    });
    
    export const { addtocategories, removefromcategories } = categoriesSlice .actions;
    export default categoriesSlice .reducer;
    

