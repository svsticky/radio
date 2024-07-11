import { configureStore } from '@reduxjs/toolkit';

import { koala, contentful, github } from './api';
import state from './state';

const store = configureStore({
  reducer: {
    [koala.reducerPath]: koala.reducer,
    [contentful.reducerPath]: contentful.reducer,
    [github.reducerPath]: github.reducer,
    state
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(koala.middleware)
      .concat(contentful.middleware)
      .concat(github.middleware);
  }
});

export default store;
