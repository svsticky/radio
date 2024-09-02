import { createSlice } from "@reduxjs/toolkit";

const screen = createSlice({
  name: "screen",
  initialState: {
    screenCurrentIndex: 0,
    boardMessageIndex: 0,
    current: "activities",
  },
  reducers: {
    incrementCurrentIndex(state) {
      state.screenCurrentIndex++;
    },
    resetCurrentIndex(state) {
      state.screenCurrentIndex = 0;
    },

    incrementBoardMessageIndex(state) {
      state.boardMessageIndex++;
    },
    resetBoardMessageIndex(state) {
      state.boardMessageIndex = 0;
    },

    setCurrent(state, action) {
      state.current = action.payload;
    },
  },
});

export const {
  incrementCurrentIndex,
  resetCurrentIndex,
  incrementBoardMessageIndex,
  resetBoardMessageIndex,
  setCurrent,
} = screen.actions;
export default screen.reducer;
