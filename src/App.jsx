import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  Activities,
  Clock,
  BoardText,
  Quotes,
  Ad,
  Commits
} from './components';

import {nextState} from './store';
import {contentful} from './store/api';
import {resetQuotes} from './store/state';

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
  const dispatch = useDispatch();

  useEffect(() => {
    const result = dispatch(contentful.endpoints.quotes.initiate());

    result.then(({ data: quotes }) => {
      dispatch(resetQuotes(quotes.length));
    });

    return result.unsubscribe;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(nextState);
    }, import.meta.env.VITE_NEXT_INTERVAL);

    return () => clearInterval(interval);
  });

  const state = useSelector(state => state.state);

  switch (state.current) {
    case 'activities':
      return <Activities current={state.activityIndex} />;
    case 'advertisement':
      return <Ad current={state.adIndex} />;
    case 'boardText':
      return <BoardText current={state.boardMessageIndex} />;
    case 'quotes':
      return <Quotes current={state.quoteIndex} />;
    case 'commits':
      return <Commits />;
    default:
      return <></>;
  }
}
