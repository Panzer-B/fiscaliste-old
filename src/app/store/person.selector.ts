import { createSelector } from "@ngrx/store";
import { AppState } from "./reducers";
import { PersonState } from "./person.state";

export const selectPerson = (state: AppState) => {
    return state.person;
};
export const selectPersonGrossIncome = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.grossIncome
    }
);

export const selectPersonNetIncome = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.netIncome
    }
);

export const selectPersonHourlyRate = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.hourlyRate
    }
);

export const selectPersonWeeklyHours = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.weeklyHours
    }
);
