import { Octokit } from 'octokit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

const octokit = new Octokit();

type Commit = {
  message: string;
  author: string;
  date: number | null;
  repo: string;
  owner: string;
  avatar?: string;
};

/**
 * Get all commits in the svsticky organisation from the last 2 weeks
 * sorted on commit date descendingly.
 */
async function allCommits() {
  try {
    const week = 7 * 24 * 60 * 60 * 1000;
    const twoWeeksAgo = new Date(new Date().getTime() - 2 * week);
    const yearString = twoWeeksAgo.getUTCFullYear();
    const monthString = String(twoWeeksAgo.getUTCMonth() + 1).padStart(2, '0');
    const dayString = String(twoWeeksAgo.getUTCDate() + 1).padStart(2, '0');
    const {
      data: { items },
    } = await octokit.rest.search.commits({
      q: `org:svsticky+committer-date:>${yearString}-${monthString}-${dayString}`,
      sort: 'committer-date',
    });

    return {
      data: items.map((item) => ({
        id: item.sha,
        message: item.commit.message,
        author: item.commit.author.name,
        date: new Date(item.commit.author.date).getTime(),
        repo: item.repository.name,
        owner: 'svsticky',
        avatar: item.author?.avatar_url,
      })),
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
  }),
});

export const { useAllCommitsQuery } = github;
