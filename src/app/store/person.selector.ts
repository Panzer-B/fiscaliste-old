import { createSelector } from "@ngrx/store";
import { AppState } from "./reducers";
import { PersonState } from "./person.state";

export const selectPerson = (state: AppState) => {
    console.log('state.person : ', state);
    return state.person;
};
export const selectPersonIncome = createSelector(
    selectPerson,
    (state: PersonState) => {
        console.log('state : ', state);
        return state.grossIncome
    }
);
