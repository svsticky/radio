import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
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
