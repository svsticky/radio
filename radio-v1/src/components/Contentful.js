const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
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
