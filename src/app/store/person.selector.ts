import { createSelector } from "@ngrx/store";
import { AppState } from "./reducers";
import { PersonState } from "./person.state";

export const selectPerson = (state: AppState) => {
    return state.person;
};
export const selectPersonNetIncome = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.netIncome
    }
);
