import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum StateMachineState {
  Activities,
  Advertisement,
  BoardText,
  Commits,
  CommitteeClash,
  Quotes,
  SnowHeight,
}

export type StateConfig = {
  internal?: boolean;  // only shown when displayInternal=true
  enabled?: boolean;  // always skipped
  needsContentful?: boolean;
};

/**
 * Configuration for each state. Order of the enum drives transition sequence.
 * Set internal:true to hide a state from public displays.
 * Set enabled:false to skip a state entirely.
 */
const enabled = (key: string) => import.meta.env[key] !== 'false';
export const stateConfig: Record<StateMachineState, StateConfig> = {
  [StateMachineState.Activities]:     { enabled: enabled('VITE_SHOW_ACTIVITIES_PAGE') },
  [StateMachineState.Advertisement]:  { enabled: enabled('VITE_SHOW_ADVERTISEMENT_PAGE'), needsContentful: true },
  [StateMachineState.BoardText]:      { enabled: enabled('VITE_SHOW_BOARDTEXT_PAGE'), internal: true, needsContentful: true },
  [StateMachineState.Commits]:        { enabled: enabled('VITE_SHOW_COMMITS_PAGE') && !!import.meta.env.VITE_GITHUB_REPOS, internal: true },
  [StateMachineState.CommitteeClash]: { enabled: enabled('VITE_SHOW_COMMITTEECLASH_PAGE') && !!import.meta.env.VITE_COMMITTEECLASH_GRAPH },
  [StateMachineState.Quotes]:         { enabled: enabled('VITE_SHOW_QUOTES_PAGE'), needsContentful: true },
  [StateMachineState.SnowHeight]:     { enabled: enabled('VITE_SHOW_SNOWHEIGHT_PAGE') && !!import.meta.env.VITE_SNOW_HEIGHT_URL, needsContentful: true },
};

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
