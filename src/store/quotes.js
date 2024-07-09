import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import getContentfulContent from "../helpers/contentful";

const quotes = createApi({
  reducerPath: "quotes",
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getQuotes: build.query({
      async queryFn() {
        try {
          const res = await getContentfulContent('quotes');
          return { data: res.map(entry => entry.fields) };
        } catch (error) {
          return { error: error.toString() };
        }
      }
    })
  })
});

export const { useGetQuotesQuery } = quotes;
export default quotes;

