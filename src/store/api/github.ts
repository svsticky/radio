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
 * Get all commits from all the configered repos in the environment
 */
async function allCommits() {
  try {
    const commitsPerRepo = await Promise.allSettled(
      import.meta.env.VITE_GITHUB_REPOS.split(' ').map((name) => {
        const [owner, repo] = name.split('/');
        return listCommits(owner, repo);
      }),
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
      org: 'svsticky', //  TODO: Maybe move this to the env file
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
