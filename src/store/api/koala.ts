import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ResponseActivity = {
  name: string,
  start_date: string,
  end_date: string | null,
  poster: string,
  participant_counter: number
};

export type Activity = Omit<ResponseActivity, 'start_date' | 'end_date'> & {
  start_date: number,
  end_date: number | null,
  has_start_time: boolean,
  has_end_time: boolean
};

/**
 * The koala api slice
 *
 * Uses a fetch-based base query, the endpoint's query is appended to
 * the base url and assumes the response is JSON, which is automatically decoded.
 */
const koala = createApi({
  reducerPath: 'koala',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_KOALA_API_BASE
  }),
  endpoints: build => ({
    activities: build.query<Activity[], void>({
      query: () => 'activities',
      transformResponse: (result: ResponseActivity[]): Activity[] => result
        .filter(act => act.poster)
        .map(setDate)
        .sort((a, b) => a.start_date - b.start_date)
    })
  })
});

/**
 * Patch an activity
 */
function setDate(activity: ResponseActivity): Activity {
  return {
    ...activity,
    start_date: new Date(activity.start_date).getTime(),
    end_date: activity.end_date
      ? new Date(activity.end_date).getTime()
      : null,
    has_start_time: activity.start_date.indexOf('T') > -1,
    has_end_time: activity.end_date
      ? activity.end_date.indexOf('T') > -1
      : false
  };
}

export const { useActivitiesQuery } = koala;
export default koala;
