import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { KOALA_ACTIVITY_ENDPOINT } from '../helpers/env';

const activities = createApi({
  reducerPath: 'activities',
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getActivities: build.query({
      async queryFn() {
        try {
          const result = await fetch(KOALA_ACTIVITY_ENDPOINT)
            .then(resp => resp.json())
          return {
            data: result
              .filter(act => act.poster)
              .map(setDate)
              .sort((a, b) => a.start_date - b.start_date)
          };
      } catch (error) {
          return { error: error.toString() };
        }
      }
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

export const { useGetActivitiesQuery } = activities;
export default activities;
