import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ResponseActivity = {
  id: string | number;
  name: string;
  start_date?: string;
  end_date?: string | null;
  dateTimeStart?: string;
  dateTimeEnd?: string | null;
  poster?: string | null;
  posterPath?: string | null;
  posterFileName?: string | null;
  participant_counter?: string | number;
  enrollments?: unknown[];
  showInKoala?: boolean;
  showOnWebsite?: boolean;
  show_on_website?: boolean;
};

export type Activity = {
  id: string;
  name: string;
  start_date: string;
  end_date: string | null;
  poster: string;
  participant_counter: string;
  has_start_time: boolean;
  has_end_time: boolean;
};

/**
 * The activities api slice for Radio, supporting both Koala and Tavern backend responses.
 */
export const koala = createApi({
  reducerPath: 'koala',
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_TAVERN_API_BASE ||
      import.meta.env.VITE_KOALA_API_BASE,
  }),
  endpoints: (build) => ({
    activities: build.query<Activity[], void>({
      query: () => 'activities',
      transformResponse: (result: ResponseActivity[]): Activity[] => {
        const baseUrl =
          import.meta.env.VITE_TAVERN_API_BASE ||
          import.meta.env.VITE_KOALA_API_BASE ||
          '';
        const normalizedBaseUrl = baseUrl
          ? baseUrl.endsWith('/')
            ? baseUrl
            : `${baseUrl}/`
          : '';

        return result
          .map((act) => {
            const startDate = act.dateTimeStart || act.start_date || '';
            const endDate = act.dateTimeEnd || act.end_date || null;

            let posterUrl = act.poster || '';
            if (!posterUrl && (act.posterPath || act.posterFileName)) {
              posterUrl = `${normalizedBaseUrl}activities/${act.id}/poster`;
            }

            let participantCount = '';
            if (
              act.participant_counter !== undefined &&
              act.participant_counter !== null
            ) {
              participantCount = act.participant_counter.toString();
            } else if (Array.isArray(act.enrollments)) {
              participantCount = act.enrollments.length.toString();
            }

            return {
              id: act.id.toString(),
              name: act.name,
              start_date: startDate,
              end_date: endDate,
              poster: posterUrl,
              participant_counter: participantCount,
              has_start_time: startDate.indexOf('T') > -1,
              has_end_time: endDate ? endDate.indexOf('T') > -1 : false,
            };
          })
          .filter((act) => act.poster)
          .sort(
            (a, b) =>
              new Date(a.start_date).getTime() -
              new Date(b.start_date).getTime(),
          );
      },
    }),
  }),
});

export const { useActivitiesQuery } = koala;
