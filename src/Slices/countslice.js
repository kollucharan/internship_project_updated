import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count :0
};
const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    addtocount: (state, action) => {
        return { ...state, count: state.count + 1 };
    },
    removefromcount: (state, action) => {
        console.log(action)
        return { ...state, count: state.count - action.payload };
    },
  },
});

export const { addtocount, removefromcount } =
  countSlice.actions;
export default countSlice.reducer;
