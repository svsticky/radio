import { configureStore } from "@reduxjs/toolkit";
import activities from "./store/activities";
import ads from "./store/ads";

const store = configureStore({
  reducer: {
    [activities.reducerPath]: activities.reducer,
    [ads.reducerPath]: ads.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(activities.middleware)
      .concat(ads.middleware);
  }
});

export default store;
