import {
  createClient,
  type EntryFieldTypes,
  type Entry,
  type EntrySkeletonType,
} from 'contentful';
import { createApi } from '@reduxjs/toolkit/query/react';

export function isContentfulValid() {
  return (
    import.meta.env.VITE_CONTENTFUL_SPACE_ID != undefined &&
    import.meta.env.VITE_CONTENTFUL_SPACE_ID != '' &&
    import.meta.env.VITE_CONTENTFUL_ENVIRONMENT != undefined &&
    import.meta.env.VITE_CONTENTFUL_ENVIRONMENT != '' &&
    import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN != undefined &&
    import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN != ''
  );
}

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

function createBaseQuery() {
  if (isContentfulValid()) {
    const client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
      environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
    });

    /**
     * A base query function for contentful queries: each endpoint
     * specifies the content_type of the thing it requests and these
     * entries are searched via the contentful API.
     */
    return async function contentfulBaseQuery(
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
    };
  } else {
    return async () => ({ data: [] });
  }
}

export const contentful = createApi({
  reducerPath: 'contentful',
  baseQuery: createBaseQuery(),
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
