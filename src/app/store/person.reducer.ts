import { ActionsUnion, ActionTypes } from "./person.action";
import { PersonState } from "./person.state";

export const initialState: PersonState = {
    grossIncome: 0
};

export function personReducer(state = initialState, action: ActionsUnion) {
    switch (action.type) {
        case ActionTypes.SET_INCOME:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
