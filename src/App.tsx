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
import { StateMachineState } from './store/state';
import { resetQuotes } from './store/quotes';

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

export interface StateMachineSlideProps {
  current: number;
}

type TimerOptions = { interval: boolean };
export function useTimer(): void;
export function useTimer(options: TimerOptions): void;
export function useTimer(
  duration: number | undefined,
  options?: TimerOptions,
): void;
export function useTimer(
  arg: number | TimerOptions | undefined = undefined,
  options: TimerOptions = { interval: false },
) {
  const duration =
    typeof arg === 'number' ? arg : Number(import.meta.env.VITE_NEXT_INTERVAL);

  options =
    typeof arg !== 'number' && arg !== undefined
      ? { ...options, ...arg }
      : options;

  const dispatch = useAppDispatch();
  useEffect(() => {
    const handler = () => dispatch(nextState);
    if (options.interval) {
      const interval = setInterval(handler, duration);
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(handler, duration);
      return () => clearTimeout(timeout);
    }
  }, [dispatch]);
}

function StateMachine() {
  const dispatch = useAppDispatch();

  // Preload the quotes and initialise the store with the quote indices
  useEffect(() => {
    const result = dispatch(contentful.endpoints.quotes.initiate());

    result.then(({ data: quotes, isSuccess }) => {
      if (isSuccess) dispatch(resetQuotes(quotes.length));
    });

    return result.unsubscribe;
  }, [dispatch]);

  // Create timer that ticks the state machine
  // useEffect(() => {
  //   const interval = setInterval(
  //     () => {
  //       dispatch(nextState);
  //     },
  //     Number(import.meta.env.VITE_NEXT_INTERVAL),
  //   );
  //
  //   return () => clearInterval(interval);
  // }, [dispatch]);

  // Display the correct component based on state machine's state
  const state = useAppSelector((state) => state.screen);
  const quotes = useAppSelector((state) => state.quotes);

  switch (state.current) {
    case StateMachineState.Activities:
      return <Activities current={state.screenCurrentIndex} />;
    case StateMachineState.Advertisement:
      return <Ad current={state.screenCurrentIndex} />;
    case StateMachineState.BoardText:
      return <BoardText current={state.boardMessageIndex} />;
    case StateMachineState.Quotes:
      return <Quotes current={quotes.quoteIndex} />;
    case StateMachineState.Commits:
      return <Commits />;
    default:
      return <></>;
  }
}
