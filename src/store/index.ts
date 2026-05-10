import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';

import { koala, contentful, github, weather, isContentfulValid } from './api';
import screen, {
  incrementBoardMessageIndex,
  incrementCurrentIndex,
  resetBoardMessageIndex,
  resetCurrentIndex,
  setCurrent,
  StateMachineState,
  stateConfig,
} from './state';
import { useDispatch, useSelector } from 'react-redux';
import quotes, { nextQuote, resetQuotes } from './quotes';

/**
 * nextState is the transition function for the state machine. It
 * updates the state slice with new values based on the loaded
 * activities, ads, etc.
 *
 * This function is implemented as a
 * [synchronous thunk]{@link https://redux.js.org/usage/writing-logic-thunks#what-is-a-thunk}
 * that is invoked at a fixed interval in the StateMachine component.
 */
export const nextState: ThunkAction<void, RootState, void, UnknownAction> = (
  dispatch,
  getState,
) => {
  const params = new URLSearchParams(window.location.search);
  const displayInternal = params.get('internal') === 'true';

  const state = getState();

  switch (state.screen.current) {
    case StateMachineState.Activities:
      {
        const { data: activities } = koala.endpoints.activities.select()(state);

        if (
          activities == undefined ||
          state.screen.screenCurrentIndex >= activities.length - 1
        ) {
          dispatch(resetCurrentIndex());
          break;
        } else {
          dispatch(incrementCurrentIndex());
          return;
        }
      }

    case StateMachineState.Advertisement:
      {
        if (!isContentfulValid()) {
          dispatch(resetCurrentIndex());
        } else {
          const { data: ads, isSuccess } =
            contentful.endpoints.ads.select()(state);
          if (!isSuccess) break;

          if (state.screen.screenCurrentIndex >= ads.length - 1) {
            dispatch(resetCurrentIndex());
            break;
          } else {
            dispatch(incrementCurrentIndex());
            return;
          }
        }
      }
      break;

    case StateMachineState.BoardText:
      {
        const { data: messages, isSuccess } =
          contentful.endpoints.boardMessages.select()(state);

        if (isSuccess) {
          if (state.screen.boardMessageIndex >= messages.length - 1) {
            dispatch(resetBoardMessageIndex());
            break;
          } else {
            dispatch(incrementBoardMessageIndex());
            return;
          }
        }
      }
      break;

    case StateMachineState.SnowHeight:
      break;

    case StateMachineState.Quotes:
      if (!state.quotes.availableQuotes.length) {
        const { data: quotes, isSuccess } =
          contentful.endpoints.quotes.select()(state);

        if (isSuccess) dispatch(resetQuotes(quotes.length));
      } else {
        dispatch(nextQuote());
      }
      break;

    case StateMachineState.Commits:
      break;

    case StateMachineState.CommitteeClash:
      break;
  }

  // Get all numeric enum values in declaration order.
  const allStates = Object.keys(StateMachineState)
    .filter(k => !isNaN(Number(k)))
    .map(k => Number(k) as StateMachineState);

  const currentIndex = allStates.indexOf(state.screen.current);

  // Walk forward (wrapping around) until we find a state that is allowed.
  for (let i = 1; i <= allStates.length; i++) {
    const candidate = allStates[(currentIndex + i) % allStates.length];
    const config = stateConfig[candidate as StateMachineState];

    if (!config.enabled) continue;               // skip disabled states
    if (config.internal && !displayInternal) continue; // skip internal states on public displays
    if (!isContentfulValid() && config.needsContentful) continue; // skip states requiring contentful

    dispatch(setCurrent(candidate));
    return;
  }
};

/**
 * The store consists of 5 slices: one for every api source we use
 * and one for the state machine variables.
 */
const store = configureStore({
  reducer: {
    [koala.reducerPath]: koala.reducer,
    [contentful.reducerPath]: contentful.reducer,
    [github.reducerPath]: github.reducer,
    [weather.reducerPath]: weather.reducer,
    screen,
    quotes,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(koala.middleware)
      .concat(contentful.middleware)
      .concat(github.middleware)
      .concat(weather.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
