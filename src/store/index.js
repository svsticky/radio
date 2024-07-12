import { configureStore } from '@reduxjs/toolkit';

import { koala, contentful, github } from './api';
import state, * as actions from './state';

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
  switch (state.state.current) {
    case 'activities': {
      const { data: activities } = koala.endpoints.activities.select()(state);

      if (state.state.activityIndex >= activities.length - 1) {
        dispatch(actions.setCurrent('advertisement'));
        dispatch(actions.resetActivityIndex());
      } else {
        dispatch(actions.incrementActivityIndex());
      }
    } break;

    case 'advertisement': {
      const { data: ads } = contentful.endpoints.ads.select()(state);

      if (state.state.adIndex >= ads.length - 1) {
        dispatch(actions.setCurrent(
          displayInternal
            ? 'boardText'
            : 'activities'
        ));
        dispatch(actions.resetAdIndex());
      } else {
        dispatch(actions.incrementAdIndex());
      }
    } break;

    case 'boardText': {
      const { data: messages } = contentful.endpoints.boardMessages.select()(state);

      if (state.state.boardMessageIndex >= messages.length - 1) {
        dispatch(actions.resetBoardMessageIndex());
      } else {
        dispatch(actions.incrementBoardMessageIndex());
      }

      dispatch(actions.setCurrent('quotes'));
    } break;

    case 'quotes':
      if (!state.state.availableQuotes.length) {
        const { data: quotes } = contentful.endpoints.quotes.select()(state);
        dispatch(actions.resetQuotes(quotes.length));
      } else {
        dispatch(actions.nextQuote());
      }

      dispatch(actions.setCurrent(
        import.meta.env.VITE_GITHUB_REPOS
        ? 'commits'
        : 'activities'
      ));
      break;

    case 'commits':
      dispatch(actions.setCurrent('activities'));
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
    state
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(koala.middleware)
      .concat(contentful.middleware)
      .concat(github.middleware);
  }
});

export default store;
