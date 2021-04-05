import {createReducer} from "@reduxjs/toolkit";
import {addCapitalEntry, addCashFlowEntry, removeCashFlowEntry} from "./finance.actions";
import {FinanceState, UUID} from "./finance.state";
import store from "../store";
import {setShowTip} from "../settings/settings.actions";

const initialFinanceState: FinanceState = {
    cashFlow: [],
    capital: []
}

export const FinanceReducer = createReducer(initialFinanceState, (builder) => {
    builder.addCase(addCashFlowEntry, (state, action) => {

        const cashFlowEntry = {
            ...action.payload,
            id: uuid()
        }

        const newState = {
            ...state,
            cashFlow: [...state.cashFlow, cashFlowEntry]
        }

        if (newState.cashFlow.length === 10) {
            setTimeout(() => {
                store.dispatch(setShowTip(true))
            }, 2000)
        }

        return newState;
    })

    builder.addCase(removeCashFlowEntry, (state, action) => {
        return {
            ...state,
            cashFlow: state.cashFlow.filter(e => e.id !== action.payload)
        }
    })

    builder.addCase(addCapitalEntry, (state, action) => {
        const capitalEntry = {
            ...action.payload,
            id: uuid()
        }

        return {
            ...state,
            capital: [...state.capital, capitalEntry]
        }
    })
})


function uuid(): UUID {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}