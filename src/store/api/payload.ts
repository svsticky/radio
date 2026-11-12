import { PayloadSDK } from '@payloadcms/sdk';
import { createApi } from '@reduxjs/toolkit/query/react';

type PayloadEnsuredEnv = Exclude<ImportMetaEnv, 'VITE_PAYLOAD_API_URL'> & {
  VITE_PAYLOAD_API_URL: string;
};

/**
 * Check whether all variables for payload are configured.
 * Payload does not require an API key, since this code is executed
 * in the browser and, therefore, an API key would be publicly accessible
 * and serves no use.
 * @param env The `import.meta.env` whose type will be refined if the Payload
 *            variables are correctly configured.
 * @returns whether Payload can be used.
 */
export function isPayloadValid(env: ImportMetaEnv): env is PayloadEnsuredEnv {
  return (
    env.VITE_PAYLOAD_API_URL !== undefined && env.VITE_PAYLOAD_API_URL !== ''
  );
}

function createBaseQuery() {
  if (isPayloadValid(import.meta.env)) {
    const payload = new PayloadSDK({
      baseURL: import.meta.env.VITE_PAYLOAD_API_URL,
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
