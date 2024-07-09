import { configureStore } from "@reduxjs/toolkit";

import activities from "./store/activities";
import ads from "./store/ads";
import boardMessages from "./store/boardMessages";
import quotes from "./store/quotes";
import state from "./store/state";

const store = configureStore({
  reducer: {
    [activities.reducerPath]: activities.reducer,
    [ads.reducerPath]: ads.reducer,
    [boardMessages.reducerPath]: boardMessages.reducer,
    [quotes.reducerPath]: quotes.reducer,
    state
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(activities.middleware)
      .concat(ads.middleware)
      .concat(boardMessages.middleware)
      .concat(quotes.middleware);
  }
});

export default store;
