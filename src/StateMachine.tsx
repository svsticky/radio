import { useEffect } from 'react';
import {
  SnowHeight,
  Activities,
  Ad,
  BoardText,
  Quotes,
  Commits,
} from './components';
import { useAppDispatch, nextState, useAppSelector } from './store';
import { contentful } from './store/api';
import { resetQuotes } from './store/quotes';
import { StateMachineState, togglePaused } from './store/state';

export interface StateMachineSlideProps {
  current: number;
}

type TimerOptions = {
  duration: number;
  interval: boolean;
  dependencies: unknown[];
};

/**
 * Set a (repeated) timer that ticks the state machine with a given configuration. When the component unmounts the timer is cleared.
 * @param [args] the options for the timer:
 *  - duration: duration in seconds
 *  - interval: whether the timer should repeat
 *  - dependencies: extra dependencies to trigger new timeouts
 */
export function useTimer(args: Partial<TimerOptions> = {}) {
  const options = {
    duration: Number(import.meta.env.VITE_NEXT_INTERVAL),
    interval: false,
    dependencies: [],
    ...args,
  } as TimerOptions;

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.screen);
  useEffect(() => {
    const handler = () => (!state.paused ? dispatch(nextState) : undefined);
    if (options.interval) {
      const interval = setInterval(handler, options.duration);
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(handler, options.duration);
      return () => clearTimeout(timeout);
    }
  }, [dispatch, state, ...options.dependencies]);
}

export function StateMachine() {
  const dispatch = useAppDispatch();

  // Preload the quotes and initialise the store with the quote indices
  useEffect(() => {
    document.body.onkeydown = function (e) {
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
        dispatch(nextState);
      } else if (e.key == ' ') {
        dispatch(togglePaused());
      }
    };

    const result = dispatch(contentful.endpoints.quotes.initiate());

    result.then(({ data: quotes, isSuccess }) => {
      if (isSuccess) dispatch(resetQuotes(quotes.length));
    });

    return result.unsubscribe;
  }, [dispatch]);

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
    case StateMachineState.SnowHeight:
      return <SnowHeight />;
    default:
      return <></>;
  }
}
