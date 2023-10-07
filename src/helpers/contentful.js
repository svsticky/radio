import { createClient } from "contentful";
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from "./env";

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

// Get all entries from Contentful and return the data array
export default function GetContent(type, func) {
  client
    .getEntries({
      'content_type': type
    })
    .then(result => {
      func(result.items)
    })
    .catch(err => { throw err });
}
