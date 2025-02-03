import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ResponseActivity = {
  id: string;
  name: string;
  start_date: string;
  end_date: string | null;
  poster: string;
  participant_counter: string;
};

export type Activity = ResponseActivity & {
  has_start_time: boolean;
  has_end_time: boolean;
};

/**
 * The koala api slice
 *
 * Uses a fetch-based base query, the endpoint's query is appended to
 * the base url and assumes the response is JSON, which is automatically decoded.
 */
export const koala = createApi({
  reducerPath: 'koala',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_KOALA_API_BASE,
  }),
  endpoints: (build) => ({
    activities: build.query<Activity[], void>({
      query: () => 'activities',
      transformResponse: (result: ResponseActivity[]): Activity[] =>
        result
          .filter((act) => act.poster)
          .map(
            (activity) =>
              ({
                ...activity,
                has_start_time: activity.start_date.indexOf('T') > -1,
                has_end_time:
                  activity.end_date && activity.end_date.indexOf('T') > -1,
              }) as Activity,
          )
          .sort(
            (a, b) =>
              new Date(a.start_date).getTime() -
              new Date(b.start_date).getTime(),
          ),
    }),
  }),
});

export const { useActivitiesQuery } = koala;
