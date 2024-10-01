import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum StateMachineState {
  Activities,
  Advertisement,
  BoardText,
  Quotes,
  Commits
}

export type StateMachine = {
  screenCurrentIndex: number,
  boardMessageIndex: number,
  current: StateMachineState
};

const screen = createSlice({
  name: "screen",
  initialState: {
    screenCurrentIndex: 0,
    boardMessageIndex: 0,
    current: StateMachineState.Activities
  } as StateMachine,
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

    setCurrent(state, action: PayloadAction<StateMachineState>) {
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
