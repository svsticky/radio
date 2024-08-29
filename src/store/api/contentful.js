import { createClient } from 'contentful';
import { createApi } from '@reduxjs/toolkit/query/react';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

/**
 * A base query function for contentful queries: each endpoint
 * specifies the content_type of the thing it requests and these
 * entries are searched via the contentful API.
 */
async function contentfulBaseQuery(content_type) {
  try {
    const res = await client.getEntries({ content_type });
    return { data: res.items.map(entry => entry.fields) };
  } catch (error) {
    return { error: error.toString() };
  }
}

export const contentful = createApi({
  reducerPath: 'contentful',
  baseQuery: contentfulBaseQuery,
  endpoints: build => ({
    ads: build.query({ query: () => 'ads' }),
    boardMessages: build.query({
      query: () => 'board-message',
      transformResponse: response => response.map(message => message.message)
    }),
    quotes: build.query({ query: () => 'quotes' })
  })
});

export const {
  useAdsQuery,
  useBoardMessagesQuery,
  useQuotesQuery
} = contentful;
