import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { CashFlowEntry } from './finance/finance.state'
import rootReducer from "./reducer";

import { load, save } from "redux-localstorage-simple"


const migrate = () => {
  const localStorageData = window.localStorage.getItem('redux_localstorage_simple')

  if (localStorageData !== null) {
    const data = JSON.parse(localStorageData)

    if (data.environment.dataModelVersion < 4) {
      window.localStorage.setItem('redux_localstorage_simple', '{}')
    }
  }
}
migrate();

const createStoreWithMiddleware
    = applyMiddleware(
    save() // Saving done here
)(createStore)

const store = createStoreWithMiddleware(
    rootReducer,
    load() // Loading done here,
)

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./reducer", () => {
    const newRootReducer = require("./reducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export default store;
