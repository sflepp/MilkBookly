import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { CashFlowEntry } from './finance/finance.state'
import rootReducer from "./reducer";

import { load, save } from "redux-localstorage-simple"


/* const migrate = () => {
  const localStorageData = window.localStorage.getItem('redux_localstorage_simple')

  if (localStorageData !== null) {
    const data = JSON.parse(localStorageData)

    if (data.environment.dataModelVersion === 1) {
      console.log('updating version 1 => 2')

      // remove wrong categories
      data.finance.cashFlow = data.finance.cashFlow.filter((cf: CashFlowEntry) => cf.type !== 'income')
      data.finance.cashFlow = data.finance.cashFlow.map((cf: CashFlowEntry) => {
        return {
          ...cf,
          category: 'unknown'
        }
      })

      data.environment.dataModelVersion = 2

      window.localStorage.setItem('redux_localstorage_simple', JSON.stringify(data))
      console.log('udpate written 1 => 2')
    }

    if (data.environment.dataModelVersion === 2) {
      console.log('updating version 2 => 3')
      // Set start date of continous to 2021
      data.finance.cashFlow = data.finance.cashFlow.map((cf: CashFlowEntry): CashFlowEntry => {
        if (cf.recurrence.type === 'continuous') {
          return {
            ...cf,
            start: new Date(2021, 0, 1).toISOString()
          }
        }

        return cf;
      })

      data.environment.dataModelVersion = 3

      window.localStorage.setItem('redux_localstorage_simple', JSON.stringify(data))
      console.log('udpate written 2 => 3')
    }
  }
}
migrate(); */

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
