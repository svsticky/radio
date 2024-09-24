import { createSlice } from "@reduxjs/toolkit";

const quotes = createSlice({
  name: 'quotes',
  initialState: {
    availableQuotes: [],
    quoteIndex: 0
  },
  reducers: {
    /**
     * Select a random quote from the list of available quotes and remove
     * it, so that it cannot be reused again until all quotes are displayed.
     */
    nextQuote(state) {
      const hi = state.availableQuotes.length - 1;
      const availableQuoteIndex = Math.floor(Math.random() * hi);

      [state.quoteIndex] = state.availableQuotes.splice(availableQuoteIndex, 1);
    },
    /**
     * Reset the list of availabe quotes to a new list of indices from 0 to the number of quotes.
     */
    resetAvailableQuotes(state, action) {
      state.availableQuotes = new Array(action.payload)
        .fill(0)
        .map((_, i) => i);
    }
  }
});

export const { nextQuote } = quotes.actions;

/**
 * A synchronous thunk that resets the quotes state into an unused valid state.
 * @param payload the total number of quotes
 */
export function resetQuotes(payload) {
  return (dispatch, _getState) => {
    dispatch(quotes.actions.resetAvailableQuotes(payload));
    dispatch(quotes.actions.nextQuote());
  }
}

export default quotes.reducer;
