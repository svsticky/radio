import { useEffect } from 'react';

import {
  Activities,
  Clock,
  BoardText,
  Quotes,
  Ad,
  Commits,
} from './components';

import { nextState, useAppDispatch, useAppSelector } from './store';
import { contentful } from './store/api';
import { actions, StateMachineState } from './store/state';

const LOGO = import.meta.env.VITE_LOGO;

export default function App() {
  return (
    <div className="app">
      <div className="topbar">
        <div className="logo">
          <img src={LOGO} alt="sticky logo" />
        </div>
        <Clock />
      </div>
      <StateMachine />
    </div>
  );
}

function StateMachine() {
  const dispatch = useAppDispatch();

  // Preload the quotes and initialise the store with the quote indices
  useEffect(() => {
    const result = dispatch(contentful.endpoints.quotes.initiate());

    result.then(({ data: quotes, isSuccess }) => {
      if (isSuccess) dispatch(actions.resetQuotes(quotes.length));
    });

    return result.unsubscribe;
  }, []);

  // Create timer that ticks the state machine
  useEffect(() => {
    const interval = setInterval(
      () => {
        dispatch(nextState);
      },
      Number(import.meta.env.VITE_NEXT_INTERVAL),
    );

    return () => clearInterval(interval);
  });

  // Display the correct component based on state machine's state
  const state = useAppSelector((state) => state.state);

  switch (state.current) {
    case StateMachineState.Activities:
      return <Activities current={state.activityIndex} />;
    case StateMachineState.Advertisement:
      return <Ad current={state.adIndex} />;
    case StateMachineState.BoardText:
      return <BoardText current={state.boardMessageIndex} />;
    case StateMachineState.Quotes:
      return <Quotes current={state.quoteIndex} />;
    case StateMachineState.Commits:
      return <Commits />;
    default:
      return <></>;
  }
}
