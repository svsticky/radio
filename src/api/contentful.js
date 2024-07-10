import { createClient } from 'contentful';
import { createApi } from '@reduxjs/toolkit/query/react';

import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from '../env';

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

async function contentfulBaseQuery(content_type) {
  try {
    const res = await client.getEntries({ content_type });
    return { data: res.items.map(entry => entry.fields) };
  } catch (error) {
    return { error: error.toString() };
  }
}

const contentful = createApi({
  reducerPath: 'contentful',
  baseQuery: contentfulBaseQuery,
  endpoints: build => ({
    ads: build.query({ query: () => 'ads' }),
    boardMessages: build.query({ query: () => 'board-message' }),
    quotes: build.query({ query: () => 'quotes' })
  })
});

export const {
  useAdsQuery,
  useBoardMessagesQuery,
  useQuotesQuery
} = contentful;
export default contentful;
