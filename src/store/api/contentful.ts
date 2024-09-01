import { createClient, type EntryFieldTypes, type Entry } from 'contentful';
import { createApi } from '@reduxjs/toolkit/query/react';

type FromSkeleton<T extends ContentfulSkeletons> = Entry<
  T,
  'WITHOUT_UNRESOLVABLE_LINKS'
>['fields'];

type AdSkeleton = {
  contentTypeId: 'ads';
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    fullscreen: EntryFieldTypes.Boolean;
    poster: EntryFieldTypes.AssetLink;
  };
};
type Ad = FromSkeleton<AdSkeleton>;

type BoardMessageSkeleton = {
  contentTypeId: 'board-message';
  fields: {
    message: EntryFieldTypes.Text;
  };
};
type BoardMessage = FromSkeleton<BoardMessageSkeleton>;

type QuoteSkeleton = {
  contentTypeId: 'quotes';
  fields: {
    person: EntryFieldTypes.Text;
    text: EntryFieldTypes.Text;
  };
};
type Quote = FromSkeleton<QuoteSkeleton>;

type ContentfulSkeletons = AdSkeleton | BoardMessageSkeleton | QuoteSkeleton;

type ContentfulResponse<
  ContentType extends ContentfulSkeletons['contentTypeId'],
> = Entry<
  Extract<ContentfulSkeletons, { contentTypeId: ContentType }>,
  'WITHOUT_UNRESOLVABLE_LINKS'
>[];

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

/**
 * A base query function for contentful queries: each endpoint
 * specifies the content_type of the thing it requests and these
 * entries are searched via the contentful API.
 */
async function contentfulBaseQuery<
  ContentType extends ContentfulSkeletons['contentTypeId'],
>(
  content_type: ContentType,
): Promise<{ data: ContentfulResponse<ContentType> } | { error: unknown }> {
  try {
    const res =
      await client.withoutUnresolvableLinks.getEntries<ContentfulSkeletons>({
        content_type,
      });
    return { data: res.items as ContentfulResponse<ContentType> };
  } catch (error) {
    return { error };
  }
}

function createQuery<ContentType extends ContentfulSkeletons['contentTypeId']>(
  content_type: ContentType,
) {
  return {
    query: () => content_type,
    transformResponse: (response: ContentfulResponse<ContentType>) =>
      response.map((entry) => entry.fields),
  };
}

const contentful = createApi({
  reducerPath: 'contentful',
  baseQuery: contentfulBaseQuery,
  endpoints: (build) => ({
    ads: build.query<Ad[], void>(createQuery('ads')),
    boardMessages: build.query<BoardMessage[], void>(
      createQuery('board-message'),
    ),
    quotes: build.query<Quote[], void>(createQuery('quotes')),
  }),
});

export const { useAdsQuery, useBoardMessagesQuery, useQuotesQuery } =
  contentful;
export default contentful;
