import { octokit } from "../helpers/github";
import { useQuery } from "../hooks/useQuery";
import Poster from "./Poster";

export const CommitsPage = () => {
  const { data: commits, isLoading } = useQuery(async () => {
    const res = await octokit.rest.repos.listCommits({
      owner: "svsticky",
      repo: "constipated-koala", // TODO ensure that the repos used are public
      per_page: 4,
    });

    const commitData = res.data.map((commit, index) => ({
      index: index,
      message: commit.commit.message,
      author: commit.commit.author.name ?? commit.commit.author.login,
      repo: "sadserver",
    }));

    console.log(commitData);

    return commitData;
  });

  if (isLoading) return <> Loading... </>;

  console.log("Hey!")
  console.log(commits);
  console.log(isLoading);

  return (
    <section className="commits-wrapper">
      <h2>Recent commits</h2>
      <ul className="commits-list">
        {commits?.map((commit) => {
          return (
            <>
              <li key={commit.index} className="commits-list__item">
                <div className="commits-list__item__message">
                  {commit.message.split('\n')[0]}
                </div>
                <div className="commits-list__item__meta">
                  On <em>{commit.repo}</em> by <strong>{commit.author}</strong>
                </div>
              </li>
            </>
          );
        })}
      </ul>
      <Poster poster="/commitcrowd.jpeg" />
    </section>
  );
};
