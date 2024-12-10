import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  myvalue: number;
}

const initialState: CounterState = {
  myvalue: 0,
};

export const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.myvalue += 1;
    },
    decrement: (state) => {
      state.myvalue -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.myvalue += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counter.actions;

export default counter;
