import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFirstState } from '.';

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
  internal?: boolean; // only shown when displayInternal=true
  enabled?: boolean; // always skipped
  needsContentful?: boolean;
};

/**
 * Configuration for each state. Order of the enum drives transition sequence.
 * Set internal:true to hide a state from public displays.
 * Set enabled:false to skip a state entirely.
 */
const FLAGS = { ...import.meta.env };
const enabled = (key: string) => FLAGS[key] !== 'false';
export const stateConfig = [
  {
    state: StateMachineState.Activities,
    enabled: enabled('VITE_SHOW_ACTIVITIES_PAGE'),
  },
  {
    state: StateMachineState.Advertisement,
    enabled: enabled('VITE_SHOW_ADVERTISEMENT_PAGE'),
    needsContentful: true,
  },
  {
    state: StateMachineState.BoardText,
    enabled: enabled('VITE_SHOW_BOARDTEXT_PAGE'),
    internal: true,
    needsContentful: true,
  },
  {
    state: StateMachineState.SnowHeight,
    enabled:
      enabled('VITE_SHOW_SNOWHEIGHT_PAGE') &&
      !!import.meta.env.VITE_SNOW_HEIGHT_URL,
    internal: true,
  },
  {
    state: StateMachineState.Quotes,
    enabled: enabled('VITE_SHOW_QUOTES_PAGE'),
    internal: true,
    needsContentful: true,
  },
  {
    state: StateMachineState.Commits,
    enabled:
      enabled('VITE_SHOW_COMMITS_PAGE') && !!import.meta.env.VITE_GITHUB_REPOS,
    internal: true,
  },
  {
    state: StateMachineState.CommitteeClash,
    enabled:
      enabled('VITE_SHOW_COMMITTEECLASH_PAGE') &&
      !!import.meta.env.VITE_COMMITTEECLASH_GRAPH,
    internal: true,
  },
];

export type StateMachine = {
  screenCurrentIndex: number;
  boardMessageIndex: number;
  quoteIndex: number;
  paused: boolean;
  current: StateMachineState;
};

const screen = createSlice({
  name: 'screen',
  initialState: {
    screenCurrentIndex: 0,
    boardMessageIndex: 0,
    quoteIndex: 0,
    paused: false,
    current: getFirstState(
      new URLSearchParams(window.location.search).get('internal') === 'true',
    ),
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

    incrementQuoteIndex(state) {
      state.quoteIndex++;
    },
    resetQuoteIndex(state) {
      state.quoteIndex = 0;
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
  incrementQuoteIndex,
  resetQuoteIndex,
  setCurrent,
  togglePaused,
} = screen.actions;
export default screen.reducer;
