import Poster from './Poster';
import {useAllCommitsQuery} from '../api/github';

function formatTime(date) {
  let hh = date.getHours();
  let mm = date.getMinutes();

  if (hh < 10) hh = '0' + hh;
  if (mm < 10) mm = '0' + mm;

  return `${hh}:${mm}`
}

function formatDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return `${dd}-${mm}-${yyyy}`;
}

export default function CommitsPage() {
  const { data: commits, isLoading } = useAllCommitsQuery();
  if (isLoading) return <> Loading... </>;

  return (
    <div>
      <h1 className="commits-title"> Recent commits</h1>
      <ul className="commits-list">
        {commits.map((commit, index) =>
          <li key={index} className="commits-list__item">
            <p className="commits-list__item__message">
              {commit.message.split('\n')[0]}
            </p>
            <p className="commits-list__item__meta">
              On <em>{commit.owner}/{commit.repo}</em> by <strong>{commit.author}</strong> ({formatDate(new Date(commit.date))} {formatTime(new Date(commit.date))})
            </p>
          </li>
        )}
      </ul>
      <Poster poster="/commitcrowd.png" />
    </div>
  );
}
