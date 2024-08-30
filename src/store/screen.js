import { createSlice } from "@reduxjs/toolkit";

const screen = createSlice({
  name: 'screen',
  initialState: {
    activityIndex: 0,
    adIndex: 0,
    boardMessageIndex: 0,
    current: 'activities'
  },
  reducers: {
    incrementActivityIndex(state) {
      state.activityIndex++;
    },
    resetActivityIndex(state) {
      state.activityIndex = 0;
    },

    incrementAdIndex(state) {
      state.adIndex++;
    },
    resetAdIndex(state) {
      state.adIndex = 0;
    },

    incrementBoardMessageIndex(state) {
      state.boardMessageIndex++;
    },
    resetBoardMessageIndex(state) {
      state.boardMessageIndex = 0;
    },

    setCurrent(state, action) {
      state.current = action.payload;
    }
  }
});

export const {
  incrementActivityIndex, resetActivityIndex,
  incrementAdIndex, resetAdIndex,
  incrementBoardMessageIndex, resetBoardMessageIndex,
  setCurrent
} = screen.actions;
export default screen.reducer;
