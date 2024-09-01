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

type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer U)[]
  ? U
  : never;
type Member = ArrayElement<
  Awaited<ReturnType<typeof octokit.rest.orgs.listMembers>>['data']
>;

/**
 * Return all commits from a Github repository
 * identified by owner and name.
 */
async function listCommits(owner: string, repo: string): Promise<Commit[]> {
  const res = await octokit.rest.repos.listCommits({
    owner,
    repo,
    per_page: 4,
  });

  return res.data.map(({ commit }) => ({
    message: commit.message,
    author: commit.author?.name ?? commit.author?.email ?? '',
    date: commit.committer?.date
      ? new Date(commit.committer.date).getTime()
      : null,
    repo,
    owner,
  }));
}

/**
 * The Github api slice
 *
 * It does not use a base query, since the octokit API
 * does not allow for a nice abstraction in endpoint form
 */
const github = createApi({
  reducerPath: 'github',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    allCommits: build.query<Commit[], void>({
      queryFn: async () => {
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
              .sort((a, b) => (a.date && b.date ? b.date - a.date : -1)),
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    members: build.query<Member[], void>({
      queryFn: async () => {
        try {
          const res = await octokit.rest.orgs.listMembers({
            org: 'svsticky',
            per_page: 100,
          });

          return { data: res.data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useAllCommitsQuery, useMembersQuery } = github;
export default github;
