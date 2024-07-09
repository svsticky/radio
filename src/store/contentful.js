import { createApi } from '@reduxjs/toolkit/query/react';
import getContentfulContent from '../helpers/contentful';

async function contentfulBaseQuery(arg) {
  try {
    const res = await getContentfulContent(arg);
    return { data: res.map(entry => entry.fields) };
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
