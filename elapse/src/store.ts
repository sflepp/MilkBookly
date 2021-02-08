import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import rootReducer from "./store/reducer";

import { load, save } from "redux-localstorage-simple"

const createStoreWithMiddleware
    = applyMiddleware(
    save() // Saving done here
)(createStore)

const store = createStoreWithMiddleware(
    rootReducer,
    load() // Loading done here
)

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./store/reducer", () => {
    const newRootReducer = require("./store/reducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export default store;
