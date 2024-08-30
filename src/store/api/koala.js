import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * The koala api slice
 *
 * Uses a fetch-based base query, the endpoint's query is appended to
 * the base url and assumes the response is JSON, which is automatically decoded.
 */
export const koala = createApi({
  reducerPath: 'koala',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_KOALA_API_BASE
  }),
  endpoints: build => ({
    activities: build.query({
      query: () => 'activities',
      transformResponse: result => result
        .filter(act => act.poster)
        .map(activity => ({
          ...activity,
          has_start_time: activity.start_date.indexOf('T') > -1,
          has_end_time: activity.end_date && activity.end_date.indexOf('T') > -1,
        }))
        .sort((a, b) => a.start_date - b.start_date)
    })
  })
});

export const { useActivitiesQuery } = koala;
