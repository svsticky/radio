import * as contentful from "contentful";

const client = contentful.createClient({
    space: String(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID),
    accessToken: String(process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN)
});

// helper function to interact with contentful
export default async function GetContent(type: string) {
    return await client
        .getEntries({
            'content_type': type
        })

        .then(result => result.items)
        .catch(err => { throw err });
}

