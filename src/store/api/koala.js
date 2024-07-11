import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const koala = createApi({
  reducerPath: 'activities',
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

function setDate(activity) {
  return Object.assign({
    ...activity,
    has_start_time: activity.start_date.indexOf('T') > -1,
    has_end_time: activity.end_date && activity.end_date.indexOf('T') > -1,
    start_date: new Date(activity.start_date)
  }, activity.end_date ? { end_date: new Date(activity.end_date) } : null);
}

export const { useActivitiesQuery } = koala;
export default koala;
