import { createSlice } from "@reduxjs/toolkit";

const state = createSlice({
  name: 'state',
  initialState: {
    activityIndex: 0,
    adIndex: 0,
    boardMessageIndex: 0,
    availableQuotes: [],
    usedQuotes: [],
    quoteIndex: 0,
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

    nextQuote(state) {
      state.usedQuotes.push(state.quoteIndex);

      const hi = state.availableQuotes.length - 1;
      const availableQuoteIndex = Math.floor(Math.random() * hi);

      [state.quoteIndex] = state.availableQuotes.splice(availableQuoteIndex, 1);
    },
    resetQuotes(state, action) {
      state.availableQuotes = new Array(action.payload)
          .fill(0)
          .map((_, i) => i);
      state.usedQuotes = [];

      const availableQuoteIndex = Math.floor(Math.random() * (action.payload - 1));
      [state.quoteIndex] = state.availableQuotes.splice(availableQuoteIndex, 1);
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
  nextQuote, resetQuotes,
  setCurrent
} = state.actions;
export default state.reducer;
