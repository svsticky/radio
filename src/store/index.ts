import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';

import { koala, contentful, github } from './api';
import state, { actions, StateMachineState } from './state';
import { useDispatch, useSelector } from 'react-redux';

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
  switch (state.state.current) {
    case StateMachineState.Activities:
      {
        const { data: activities, isSuccess } =
          koala.endpoints.activities.select()(state);

        if (!isSuccess) throw new Error('');

        if (state.state.activityIndex >= activities.length - 1) {
          dispatch(actions.resetActivityIndex());
          dispatch(actions.setCurrent(StateMachineState.Advertisement));
        } else {
          dispatch(actions.incrementActivityIndex());
        }
      }
      break;

    case StateMachineState.Advertisement:
      {
        const { data: ads, isSuccess } =
          contentful.endpoints.ads.select()(state);

        if (isSuccess) {
          if (state.state.adIndex >= ads.length - 1) {
            dispatch(actions.resetAdIndex());

            dispatch(
              actions.setCurrent(
                displayInternal
                  ? StateMachineState.BoardText
                  : StateMachineState.Activities,
              ),
            );
          } else {
            dispatch(actions.incrementAdIndex());
          }
        }
      }
      break;

    case StateMachineState.BoardText:
      {
        const { data: messages, isSuccess } =
          contentful.endpoints.boardMessages.select()(state);

        if (isSuccess) {
          if (state.state.boardMessageIndex >= messages.length - 1) {
            dispatch(actions.resetBoardMessageIndex());
          } else {
            dispatch(actions.incrementBoardMessageIndex());
          }
        }

        dispatch(actions.setCurrent(StateMachineState.Quotes));
      }
      break;

    case StateMachineState.Quotes:
      if (!state.state.availableQuotes.length) {
        const { data: quotes, isSuccess } =
          contentful.endpoints.quotes.select()(state);

        if (isSuccess) dispatch(actions.resetQuotes(quotes.length));
      } else {
        dispatch(actions.nextQuote());
      }

      dispatch(
        actions.setCurrent(
          import.meta.env.VITE_GITHUB_REPOS
            ? StateMachineState.Commits
            : StateMachineState.Activities,
        ),
      );
      break;

    case StateMachineState.Commits:
      dispatch(actions.setCurrent(StateMachineState.Activities));
      break;

    default:
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
    state,
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
