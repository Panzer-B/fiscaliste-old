import { ActionsUnion, ActionTypes } from "./person.action";
import { PersonState } from "./person.state";

export const initialState: PersonState = {
    grossIncome: 0,
    netIncome: 0
};

export function personReducer(state = initialState, action: ActionsUnion) {
    switch (action.type) {
        case ActionTypes.SET_GROSS_INCOME:
            return Object.assign({}, state, action.payload);
        case ActionTypes.SET_NET_INCOME:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
