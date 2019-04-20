import {Action} from "@ngrx/store";

export enum ActionTypes {
    SET_INCOME = 'SET_INCOME',
}

export class SetIncome implements Action {
    readonly type = ActionTypes.SET_INCOME;
    constructor(public payload: { income: number }) {}
}

export type ActionsUnion = SetIncome;
