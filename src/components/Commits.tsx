import Poster from './Poster';
import { useAllCommitsQuery } from '../store/api';
import moment from 'moment';
import { useTimer } from '../StateMachine';
import TopBar from './Topbar';

export default function Commits() {
  useTimer();
  const { data: commits, isSuccess } = useAllCommitsQuery();

  if (!isSuccess) return <></>;

  return (
    <div className="commits-wrapper">
      <div className="commits-list-wrapper">
        <TopBar />
        <h1 className="commits-title">Recent commits</h1>
        <ul className="commits-list">
          {commits.map((commit, index) => (
            <li key={index} className="commits-list__item">
              <p className="commits-list__item__message">
                {commit.message.split('\n')[0]}
              </p>
              <p className="commits-list__item__meta">
                On{' '}
                <em>
                  {commit.owner}/{commit.repo}
                </em>
                {' by'} <strong>{commit.author}</strong>
                {commit.date ? ` (${moment(commit.date).format('LLL')})` : ''}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Poster src="/commitcrowd.png" />
    </div>
  );
}
