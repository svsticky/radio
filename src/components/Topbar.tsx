import { Clock, Weather } from '.';

const LOGO = import.meta.env.VITE_LOGO;

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="logo">
        <img src={LOGO} alt="sticky logo" />
      </div>
      <Clock />
      <Weather />
    </div>
  );
}
