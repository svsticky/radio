import { Clock, Weather } from '.';

const LOGO = import.meta.env.VITE_LOGO;

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="logo topbar-left">
        <img src={LOGO} alt="sticky logo" />
      </div>
      <div className="topbar-center">
        <Clock />
      </div>
      <div className="topbar-right">
        <Weather />
      </div>
    </div>
  );
}
