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
        .map(setDate)
        .sort((a, b) => a.start_date - b.start_date)
    })
  })
});

/**
 * Patch an activity
 */
function setDate(activity) {
  return Object.assign({
    ...activity,
    has_start_time: activity.start_date.indexOf('T') > -1,
    has_end_time: activity.end_date && activity.end_date.indexOf('T') > -1,
    start_date: new Date(activity.start_date)
  }, activity.end_date ? { end_date: new Date(activity.end_date) } : null);
}

export const { useActivitiesQuery } = koala;
