import {octokit} from "../helpers/github";
import {useQuery} from "../hooks/useQuery";
import Poster from "./Poster";
import {GITHUB_REPOS} from "../helpers/env.js";

function getCommits(owner, repo) {
  return useQuery(async () => {
    const res = await octokit.rest.repos.listCommits({
      owner: owner,
      repo: repo,
      per_page: 4,
    });

    return res.data.map((commit, index) => {
      return ({
        index: index,
        message: commit.commit.message,
        author: commit.commit.author.name ?? commit.commit.author.login,
        repo: repo,
        date: new Date(commit.commit.committer.date),
        owner: owner
      })
    });
  });
}

function getAllCommits() {
  const v = GITHUB_REPOS
    .split(" ")
    .map(fIdent => {
      const v = fIdent.split("/");
      return getCommits(v[0], v[1]);
    });

  let commits = v
    .map(v => v.data)
    .flat();
  commits.sort((a, b) => {
    return b?.date?.getTime() - a?.date?.getTime();
  });

  const isLoading = v.map(v => v.isLoading);

  return {
    data: commits.slice(0, 5),
    isLoading: isLoading.includes(true),
  }
}

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

export const CommitsPage = () => {
  const { data: commits, isLoading } = getAllCommits();
  if (isLoading) return <> Loading... </>;

  return (
    <div>
      <h1 className="commits-title"> Recent commits</h1>
      <ul className="commits-list">
        {commits?.map((commit) => {
          return (
            <>
              <li key={commit.index} className="commits-list__item">
                <p className="commits-list__item__message">
                  {commit.message.split('\n')[0]}
                </p>
                <p className="commits-list__item__meta">
                  On <em>{commit.owner}/{commit.repo}</em> by <strong>{commit.author}</strong> ({formatDate(commit.date)} {formatTime(commit.date)})
                </p>
              </li>
            </>
          );
        })}
      </ul>
      <Poster poster="/commitcrowd.png" />
    </div>
  );
};
