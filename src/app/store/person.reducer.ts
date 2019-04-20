import { ActionsUnion, ActionTypes } from "./person.action";
import { PersonState } from "./person.selector";

export const initialState: PersonState = {
    income: 0
};

export function personReducer(state = initialState, action: ActionsUnion) {
    switch (action.type) {
        case ActionTypes.SET_INCOME:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
