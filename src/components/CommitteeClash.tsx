import { useTimer } from '../StateMachine';
import TopBar from './Topbar';

export default function CommitteeClash() {
  useTimer();
  return (
    <div className="basic-page">
      <div className="content-wrapper">
        <TopBar />
        <div className="graph-container">
          <iframe
            className="graph-frame"
            src={import.meta.env.VITE_COMMITTEECLASH_GRAPH}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
