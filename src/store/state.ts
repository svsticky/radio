import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum StateMachineState {
  Activities,
  CommitteeClash,
  Advertisement,
  BoardText,
  Quotes,
  Commits,
  SnowHeight,
}

export type StateMachine = {
  screenCurrentIndex: number;
  boardMessageIndex: number;
  paused: boolean;
  current: StateMachineState;
};

const screen = createSlice({
  name: 'screen',
  initialState: {
    screenCurrentIndex: 0,
    boardMessageIndex: 0,
    paused: false,
    current: StateMachineState.Activities,
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

    togglePaused(state) {
      state.paused = !state.paused;
    },
  },
});

export const {
  incrementCurrentIndex,
  resetCurrentIndex,
  incrementBoardMessageIndex,
  resetBoardMessageIndex,
  setCurrent,
  togglePaused,
} = screen.actions;
export default screen.reducer;
