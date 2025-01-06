import {
  createClient,
  type EntryFieldTypes,
  type Entry,
  type EntrySkeletonType,
} from 'contentful';
import { createApi } from '@reduxjs/toolkit/query/react';

let contentfulSpaceID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
if (contentfulSpaceID == '' || contentfulSpaceID == undefined)
  contentfulSpaceID = 'WRONG-VALUE';

let contentfulAccessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
if (contentfulAccessToken == '' || contentfulAccessToken == undefined)
  contentfulAccessToken = 'WRONG-VALUE';

let contentfulEnvironment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;
if (contentfulEnvironment == '' || contentfulEnvironment == undefined)
  contentfulEnvironment = 'WRONG-VALUE';

const client = createClient({
  space: contentfulSpaceID,
  accessToken: contentfulAccessToken,
  environment: contentfulEnvironment,
});

// Type aliases because the contentful types are quite verbose
type ToEntity<T extends EntrySkeletonType> = Entry<
  T,
  'WITHOUT_UNRESOLVABLE_LINKS'
>;
type ContentTypeIdOf<T extends Entry> = T['sys']['contentType']['sys']['id'];

export type Ad = ToEntity<{
  contentTypeId: 'ads';
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    fullscreen: EntryFieldTypes.Boolean;
    poster: EntryFieldTypes.AssetLink;
    duration?: EntryFieldTypes.Number;
  };
}>;

type BoardMessage = ToEntity<{
  contentTypeId: 'board-message';
  fields: {
    message: EntryFieldTypes.Text;
  };
}>;

type Quote = ToEntity<{
  contentTypeId: 'quotes';
  fields: {
    person: EntryFieldTypes.Text;
    text: EntryFieldTypes.Text;
  };
}>;

type ContentfulEntity = Ad | BoardMessage | Quote;

/**
 * A base query function for contentful queries: each endpoint
 * specifies the content_type of the thing it requests and these
 * entries are searched via the contentful API.
 */
async function contentfulBaseQuery(
  content_type: ContentTypeIdOf<ContentfulEntity>,
) {
  try {
    const res = await client.withoutUnresolvableLinks.getEntries({
      content_type,
    });
    return { data: res.items.map((entry) => entry.fields) };
  } catch (error) {
    return { error };
  }
}

export const contentful = createApi({
  reducerPath: 'contentful',
  baseQuery: contentfulBaseQuery,
  endpoints: (build) => ({
    ads: build.query<Ad['fields'][], void>({
      query: () => 'ads',
    }),
    boardMessages: build.query<BoardMessage['fields'][], void>({
      query: () => 'board-message',
    }),
    quotes: build.query<Quote['fields'][], void>({
      query: () => 'quotes',
    }),
  }),
});

export const { useAdsQuery, useBoardMessagesQuery, useQuotesQuery } =
  contentful;
