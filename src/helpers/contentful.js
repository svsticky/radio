import { createClient } from 'contentful';
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from './env';

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

// Get all entries from Contentful and return the data array
export default async function getContentfulContent(type) {
  const entries = await client.getEntries({ 'content_type': type });
  return entries.items;
}
