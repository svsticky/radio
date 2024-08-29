import { Octokit } from 'octokit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_API_TOKEN
});

/**
 * Return all commits from a Github repository
 * identified by owner and name.
 */
async function listCommits(owner, repo) {
  const res = await octokit.rest.repos.listCommits({
    owner, repo, per_page: 4,
  });

  return res.data.map(({ commit }) => ({
    message: commit.message,
    author: commit.author.name ?? commit.author.login,
    date: new Date(commit.committer.date),
    repo, owner
  }));
}

/**
 * Get all commits from all the configered repos in the environment
 */
async function allCommits() {
  try {
    const commitsPerRepo = await Promise.allSettled(
      import.meta.env.VITE_GITHUB_REPOS
        .split(' ')
        .map(name => {
          const [owner, repo] = name.split('/');
          return listCommits(owner, repo);
        }));

    return {
      data: commitsPerRepo
        .flatMap(commits => commits.value)
        .map(commit => ({
          ...commit,
          date: commit.date.getTime(),
        }))
        .sort((a, b) => b.date - a.date)
    };
  } catch (error) {
    return { error: error.toString() };
  }
}

/**
 * Get all members in the github organisation
 */
async function allMembers() {
  try {
    const res = await octokit.rest.orgs.listMembers({
      org: 'svsticky',
      per_page: 100,
    });

    return { data: res.data };
  } catch (error) {
    return { error: error.toString() };
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
  endpoints: build => ({
    allCommits: build.query({ queryFn: allCommits }),
    members: build.query({ queryFn: allMembers })
  })
});

export const { useAllCommitsQuery, useMembersQuery } = github;
