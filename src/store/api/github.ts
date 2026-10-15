import { Octokit } from 'octokit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_API_TOKEN,
});

type Commit = {
  message: string;
  author: string;
  date: number | null;
  repo: string;
  owner: string;
};

type Member = {
  avatar_url: string;
  name: string;
};

/**
 * Return all commits from a Github repository
 * identified by owner and name.
 */
async function listCommits(owner: string, repo: string): Promise<Commit[]> {
  const { data: commits } = await octokit.rest.repos.listCommits({
    owner,
    repo,
    per_page: 4,
  });

  return commits
    .filter((commit) => !!commit.commit.committer?.date)
    .map(({ commit, sha }) => ({
      id: sha,
      message: commit.message,
      author: commit.author?.name ?? commit.author?.email ?? '',
      date: new Date(commit.committer!.date!).getTime(),
      repo,
      owner,
    }));
}

/**
 * Fetch all repos for the configured user/organisation.
 * Tries the org endpoint first, falling back to the user endpoint. Should never use this, since svticky is an organisation.
 */
async function listRepos() {
  const account = import.meta.env.VITE_GITHUB_USER;
  const toRepoList = (data: { owner: { login: string }; name: string }[]) =>
    data.map((r) => ({ owner: r.owner.login, repo: r.name }));

  try {
    const { data } = await octokit.rest.repos.listForOrg({
      org: account,
      per_page: 100,
    });
    return toRepoList(data);
  } catch {
    const { data } = await octokit.rest.repos.listForUser({
      username: account,
      per_page: 100,
    });
    return toRepoList(data);
  }
}

/**
 * Get all commits from all repos of the configured user/organisation
 */
async function allCommits() {
  try {
    const repos = await listRepos();
    const commitsPerRepo = await Promise.allSettled(
      repos.map(({ owner, repo }) => listCommits(owner, repo)),
    );

    return {
      data: commitsPerRepo
        .flatMap((commits) =>
          commits.status === 'fulfilled' ? commits.value : [],
        )
        .filter((commit): commit is Commit & { date: number } => !!commit.date)
        .sort((a, b) => b.date - a.date),
    };
  } catch (error) {
    return { error };
  }
}

/**
 * Get all members in the github organisation
 */
async function allMembers() {
  try {
    const res = await octokit.rest.orgs.listMembers({
      org: import.meta.env.VITE_GITHUB_USER,
      per_page: 100,
    });

    return {
      data: res.data.map((member) => ({
        name: member.name || member.login,
        avatar_url: member.avatar_url,
      })) as Member[],
    };
  } catch (error) {
    return { error };
  }
}

/**
 * The Github api slice
 *
 * It does not use a base query, since the octokit API
 * does not allow for a nice abstraction in endpoint form
 */
export const github = createApi({
  reducerPath: 'github',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    allCommits: build.query<Commit[], void>({ queryFn: allCommits }),
    members: build.query<Member[], void>({ queryFn: allMembers }),
  }),
});

export const { useAllCommitsQuery, useMembersQuery } = github;
