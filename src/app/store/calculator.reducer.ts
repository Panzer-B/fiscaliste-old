import { Action } from "@ngrx/store";
import { ActionTypes } from "./calculator.action";
import { PersonState } from "./calculator.selector";

export const initialState: PersonState = {
    income: 0
};

export function calculatorReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.SET_INCOME:
            return Object.assign({}, ...state, {income: action.payload.income});
        default:
            return state;
    }
}
