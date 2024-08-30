import { createSlice } from "@reduxjs/toolkit";

const quotes = createSlice({
  name: 'quotes',
  initialState: {
    availableQuotes: [],
    quoteIndex: 0
  },
  reducers: {
    nextQuote(state) {
      const hi = state.availableQuotes.length - 1;
      const availableQuoteIndex = Math.floor(Math.random() * hi);

      [state.quoteIndex] = state.availableQuotes.splice(availableQuoteIndex, 1);
    },
    resetQuotes(state, action) {
      state.availableQuotes = new Array(action.payload)
        .fill(0)
        .map((_, i) => i);
    }
  }
});

export const { nextQuote } = quotes.actions;

export function resetQuotes(payload) {
  return (dispatch, _getState) => {
    dispatch(quotes.actions.resetQuotes(payload));
    dispatch(quotes.actions.nextQuote());
  }
}

export default quotes;
