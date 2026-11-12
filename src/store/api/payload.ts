import { PayloadSDK } from '@payloadcms/sdk';
import { createApi } from '@reduxjs/toolkit/query/react';

export function isPayloadValid() {
  return (
    import.meta.env.VITE_PAYLOAD_API_URL != undefined &&
    import.meta.env.VITE_PAYLOAD_API_URL != '' &&
    import.meta.env.VITE_PAYLOAD_API_KEY != undefined &&
    import.meta.env.VITE_PAYLOAD_API_KEY != ''
  );
}

function createBaseQuery() {
  if (isPayloadValid()) {
    const payload = new PayloadSDK({
      baseURL: import.meta.env.VITE_PAYLOAD_API_URL!,
      baseInit: {
        headers: {
          Authorization: `users API-Key ${import.meta.env.VITE_PAYLOAD_API_KEY}`,
        },
      },
    });

    /**
     * A base query function for contentful queries: each endpoint
     * specifies the content_type of the thing it requests and these
     * entries are searched via the contentful API.
     */
    return async function payloadBaseQuery(
      collection: 'ads' | 'quotes' | 'board-messages',
    ) {
      try {
        const { docs } = await payload.find({
          collection,
          limit: 1000,
          draft: false,
          locale: 'en',
        });
        console.log(docs);
        return { data: docs };
      } catch (error) {
        return { error };
      }
    };
  } else {
    return async () => ({ data: [] });
  }
}

export interface BoardMessage {
  message: string;
}

export interface Quote {
  text: string;
  person: string;
}

export interface Ad {
  poster: { url: string; mimeType: string };
  title?: string;
  description?: string;
  fullscreen: boolean;
  durationSec?: number;
}

export const payload = createApi({
  reducerPath: 'payload',
  baseQuery: createBaseQuery(),
  endpoints: (build) => ({
    ads: build.query<Ad[], void>({
      query: () => 'ads',
    }),
    boardMessages: build.query<BoardMessage[], void>({
      query: () => 'board-message',
    }),
    quotes: build.query<Quote[], void>({
      transformResponse: (response) =>
        response.toSorted(
          (_a, _b) => Math.random() - 0.5,
        ) as unknown as Quote[],
      query: () => 'quotes',
    }),
  }),
});

export const { useAdsQuery, useBoardMessagesQuery, useQuotesQuery } = payload;
