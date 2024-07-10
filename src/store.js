import { createSlice, configureStore } from '@reduxjs/toolkit';

import { koala, contentful } from './api';

const state = createSlice({
  name: 'state',
  initialState: {
    activityIndex: 0,
    adIndex: 0,
    boardMessageIndex: 0,
    quotesIndices: []
  },
  reducers: {
    incrementActivityIndex(state) {
      state.activityIndex++;
    },
    incrementAdIndex(state) {
      state.adIndex++;
    },
    incrementBoardMessageIndex(state) {
      state.boardMessageIndex++;
    },
    shiftQuote(state, action) {
      if (state.quotesIndices.length === 1) {
        state.quotesIndices = new Array(action.payload)
          .fill(0)
          .map((_, i) => i);
      } else {
        state.quotesIndices.shift();
      }
    }
  }
});

export const { incrementActivityIndex, incrementAdIndex, incrementBoardMessageIndex, shiftQuote } = state.actions;

const store = configureStore({
  reducer: {
    [koala.reducerPath]: koala.reducer,
    [contentful.reducerPath]: contentful.reducer,
    state
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(koala.middleware)
      .concat(contentful.middleware);
  }
});

export default store;
