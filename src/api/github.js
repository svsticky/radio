import { Octokit } from 'octokit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { GITHUB_API_TOKEN, GITHUB_REPOS } from '../env.js';

export const octokit = new Octokit({ auth: GITHUB_API_TOKEN });

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

const github = createApi({
  reducerPath: 'github',
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    allCommits: build.query({
      queryFn: async () => {
        try {
          const commitsPerRepo = await Promise.allSettled(
            GITHUB_REPOS
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
              .sort((a, b) => b - a)
          };
        } catch (error) {
          return { error: error.toString() };
        }
      }
    }),
    members: build.query({
      queryFn: async () => {
        try {
          const res = await octokit.rest.orgs.listMembers({
            org: 'svsticky',
            per_page: 100,
          });

          return res.data;
        } catch (error) {
          return { error: error.toString() };
        }
      }
    })
  })
});

export const { useAllCommitsQuery, useMembersQuery } = github;
export default github;
