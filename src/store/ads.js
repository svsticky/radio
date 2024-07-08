import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import getContentfulContent from "../helpers/contentful";

const ads = createApi({
  reducerPath: "ads",
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getAds: build.query({
      async queryFn() {
        try {
          const res = await getContentfulContent('ads');
          return { data: res.map(entry => entry.fields) };
        } catch (error) {
          return { error: error.toString() };
        }
      }
    })
  })
});

export const { useGetAdsQuery } = ads;
export default ads;
