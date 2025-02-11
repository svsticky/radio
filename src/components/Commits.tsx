import { useAllCommitsQuery } from '../store/api';
import moment from 'moment';
import { useTimer } from '../StateMachine';
import TopBar from './Topbar';
import ContentWithPoster from './ContentWithPoster';

export default function Commits() {
  useTimer();
  const { data: commits, isSuccess } = useAllCommitsQuery();

  if (!isSuccess) return <></>;

  return (
    <ContentWithPoster posterSrc={'./commitcrowd.png'}>
      <TopBar />
      <div>
        <h1 className="commits-title">Recent commits</h1>
        <ul className="scrollable-list">
          {commits.map((commit, index) => (
            <li key={index} className="commit-list-item">
              <p className="message">{commit.message.split('\n')[0]}</p>
              <p className="details">
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
    </ContentWithPoster>
  );
}
