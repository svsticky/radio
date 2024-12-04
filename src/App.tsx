import { Clock, Weather } from './components';
import { StateMachine } from './StateMachine';

const LOGO = import.meta.env.VITE_LOGO;

export default function App() {
  return (
    <div className="app">
      <div className="topbar">
        <div className="logo">
          <img src={LOGO} alt="sticky logo" />
        </div>
        <Clock />
        <Weather />
      </div>
      <StateMachine />
    </div>
  );
}
