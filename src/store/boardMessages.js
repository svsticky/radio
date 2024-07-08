import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import getContentfulContent from "../helpers/contentful";

const boardMessages = createApi({
  reducerPath: "boardMessages",
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getBoardMessages: build.query({
      async queryFn() {
        try {
          const results = await getContentfulContent('board-message');
          return { data: results.map(entry => entry.fields.message) };
        } catch (error) {
          return { error: error.toString() };
        }
      }
    })
  })
});

export const { useGetBoardMessagesQuery } = boardMessages;
export default boardMessages;
