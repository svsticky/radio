import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';

import { koala, contentful, github } from './api';
import screen, {
  StateMachineState,
  resetCurrentIndex,
  incrementCurrentIndex,
  resetBoardMessageIndex,
  incrementBoardMessageIndex,
  setCurrent,
} from './state';
import { useDispatch, useSelector } from 'react-redux';
import quotes, { nextQuote, resetQuotes } from './quotes';

/**
 * nextState is the transition function for the state machine. It
 * updates the the state slice with new values based on the loaded
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
        const { data: activities, isSuccess } =
          koala.endpoints.activities.select()(state);

        if (!isSuccess) throw new Error('');

        if (state.screen.screenCurrentIndex >= activities.length - 1) {
          dispatch(resetCurrentIndex());
          dispatch(setCurrent(StateMachineState.Advertisement));
        } else {
          dispatch(incrementCurrentIndex());
        }
      }
      break;

    case StateMachineState.Advertisement:
      {
        const { data: ads, isSuccess } =
          contentful.endpoints.ads.select()(state);

        if (isSuccess) {
          if (state.screen.screenCurrentIndex >= ads.length - 1) {
            dispatch(resetCurrentIndex());

            dispatch(
              setCurrent(
                displayInternal
                  ? StateMachineState.BoardText
                  : StateMachineState.Activities,
              ),
            );
          } else {
            dispatch(incrementCurrentIndex());
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
          } else {
            dispatch(incrementBoardMessageIndex());
          }
        }

        dispatch(
          setCurrent(
            import.meta.env.VITE_SNOW_HEIGHT_URL
              ? StateMachineState.SnowHeight
              : StateMachineState.Quotes,
          ),
        );
      }
      break;

    case StateMachineState.SnowHeight:
      dispatch(setCurrent(StateMachineState.Quotes));
      break;

    case StateMachineState.Quotes:
      if (!state.quotes.availableQuotes.length) {
        const { data: quotes, isSuccess } =
          contentful.endpoints.quotes.select()(state);

        if (isSuccess) dispatch(resetQuotes(quotes.length));
      } else {
        dispatch(nextQuote());
      }

      dispatch(
        setCurrent(
          import.meta.env.VITE_GITHUB_REPOS
            ? StateMachineState.Commits
            : StateMachineState.Activities,
        ),
      );
      break;

    case StateMachineState.Commits:
      dispatch(setCurrent(StateMachineState.Activities));
      break;
  }
};

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
    quotes,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(koala.middleware)
      .concat(contentful.middleware)
      .concat(github.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
