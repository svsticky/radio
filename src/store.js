import { configureStore } from "@reduxjs/toolkit";

import koala from "./store/koala";
import contentful from "./store/contentful";
import state from "./store/state";

const store = configureStore({
  reducer: {
    [koala.reducerPath]: koala.reducer,
    [contentful.reducerPath]: contentful.reducer,
    state
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(koala.middleware)
      .concat(contentful.middleware);
  }
});

export default store;
