import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/reducer";

const store = configureStore({
  reducer: rootReducer
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./store/reducer", () => {
    const newRootReducer = require("./store/reducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export default store;
