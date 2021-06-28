import { ActionsUnion, ActionTypes } from "./person.action";
import { PersonState } from "./person.state";

export const initialState: PersonState = {
    grossIncome: 0,
    netIncome: 0,
    dailyCommute: 0
};

export function personReducer(state = initialState, action: ActionsUnion) {
    switch (action.type) {
        case ActionTypes.SET_GROSS_INCOME:
        case ActionTypes.SET_NET_INCOME:
        case ActionTypes.SET_HOURLY_RATE:
        case ActionTypes.SET_WEEKLY_HOURS:
        case ActionTypes.SET_DAILY_COMMUTE:
            return Object.assign({}, {...state}, action.payload);
        default:
            return state;
    }
}
