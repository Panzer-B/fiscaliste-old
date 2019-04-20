import {Action} from "@ngrx/store";

export enum ActionTypes {
    SET_GROSS_INCOME = 'SET_GROSS_INCOME',
    SET_NET_INCOME = 'SET_NET_INCOME'
}

export class SetGrossIncome implements Action {
    readonly type = ActionTypes.SET_GROSS_INCOME;
    constructor(public payload: { grossIncome: number }) {}
}

export class SetNetIncome implements Action {
    readonly type = ActionTypes.SET_NET_INCOME;
    constructor(public payload: { netIncome: number }) {}
}

export type ActionsUnion = SetGrossIncome | SetNetIncome;
