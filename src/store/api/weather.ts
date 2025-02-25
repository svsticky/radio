import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Liveweer = {
  image: string;
  temp: number;
};

type Api = {
  rest_verz: number;
};

export type WeatherResponse = {
  api: Api[];
  liveweer: Liveweer[];
};

/**
 * The weather api slice
 *
 * Uses a fetch-based base query, the endpoint's query is appended to
 * the base url and assumes the response is JSON, which is automatically decoded.
 */
export const weather = createApi({
  reducerPath: 'weather',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://weerlive.nl/api/',
  }),
  endpoints: (build) => ({
    weather: build.query<WeatherResponse, void>({
      query: () =>
        `weerlive_api_v2.php?key=${import.meta.env.VITE_WEATHER_API_TOKEN}&locatie=52.08718206955104,5.165697854286648`,
    }),
  }),
  keepUnusedDataFor: 60 * 60,
});

export const { useWeatherQuery } = weather;
