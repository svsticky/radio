import { configureStore } from '@reduxjs/toolkit';

import { koala, contentful, github } from './api';
import screen, {
  incrementAdIndex, incrementActivityIndex,
  resetAdIndex, resetActivityIndex,
  incrementBoardMessageIndex, resetBoardMessageIndex,
  setCurrent
} from './screen';
import quotes, { resetQuotes, nextQuote } from './quotes';

/**
 * nextState is the transition function for the state machine. It
 * updates the the state slice with new values based on the loaded
 * activities, ads, etc.
 *
 * This function is implemented as a
 * [synchronous thunk]{@link https://redux.js.org/usage/writing-logic-thunks#what-is-a-thunk}
 * that is invoked at a fixed interval in the StateMachine component.
 */
export function nextState(dispatch, getState) {
  const params = new URLSearchParams(window.location.search);
  const displayInternal = params.get('internal') === 'true';

  const state = getState();
  switch (state.screen.current) {
    case 'activities': {
      const { data: activities } = koala.endpoints.activities.select()(state);

      if (state.screen.activityIndex >= activities.length - 1) {
        dispatch(setCurrent('advertisement'));
        dispatch(resetActivityIndex());
      } else {
        dispatch(incrementActivityIndex());
      }
    } break;

    case 'advertisement': {
      const { data: ads } = contentful.endpoints.ads.select()(state);

      if (state.screen.adIndex >= ads.length - 1) {
        dispatch(setCurrent(
          displayInternal
            ? 'boardText'
            : 'activities'
        ));
        dispatch(resetAdIndex());
      } else {
        dispatch(incrementAdIndex());
      }
    } break;

    case 'boardText': {
      const { data: messages } = contentful.endpoints.boardMessages.select()(state);

      if (state.screen.boardMessageIndex >= messages.length - 1) {
        dispatch(resetBoardMessageIndex());
      } else {
        dispatch(incrementBoardMessageIndex());
      }

      dispatch(setCurrent('quotes'));
    } break;

    case 'quotes':
      if (!state.quotes.availableQuotes.length) {
        const { data: quotes } = contentful.endpoints.quotes.select()(state);
        dispatch(resetQuotes(quotes.length));
      } else {
        dispatch(nextQuote());
      }

      dispatch(setCurrent(
        import.meta.env.VITE_GITHUB_REPOS
          ? 'commits'
          : 'activities'
      ));
      break;

    case 'commits':
      dispatch(setCurrent('activities'));
      break;

    default:
      break;
  }
}

/**
 * The store consists of 4 slices: one for every api source we use
 * and one for the state machine variables.
 */
const store = configureStore({
  reducer: {
    [koala.reducerPath]: koala.reducer,
    [contentful.reducerPath]: contentful.reducer,
    [github.reducerPath]: github.reducer,
    screen,
    quotes
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(koala.middleware)
      .concat(contentful.middleware)
      .concat(github.middleware);
  }
});

export default store;
