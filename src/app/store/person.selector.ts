import { createSelector } from "@ngrx/store";
import { AppState } from "./reducers";
import { PersonState } from "./person.state";
import { calculateTaxes } from "../core/taxes/income.calculator";

export const selectPerson = (state: AppState) => {
    return state.person;
};

export const selectPersonGrossIncome = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.weeklyHours * state.hourlyRate * 52;
    }
);

export const selectPersonNetIncome = createSelector(
    selectPersonGrossIncome,
    (_grossIncome: number) => {
        return calculateTaxes(_grossIncome);
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
