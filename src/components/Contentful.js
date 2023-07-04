const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
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
