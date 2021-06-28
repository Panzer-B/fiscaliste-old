import {Action} from "@ngrx/store";

export enum ActionTypes {
    SET_GROSS_INCOME = 'SET_GROSS_INCOME',
    SET_NET_INCOME = 'SET_NET_INCOME',
    SET_HOURLY_RATE = 'SET_HOURLY_RATE',
    SET_WEEKLY_HOURS = 'SET_WEEKLY_HOURS',
    SET_DAILY_COMMUTE = 'SET_DAILY_COMMUTE',
}

export class SetGrossIncome implements Action {
    readonly type = ActionTypes.SET_GROSS_INCOME;
    constructor(public payload: { grossIncome: number }) {}
}

export class SetNetIncome implements Action {
    readonly type = ActionTypes.SET_NET_INCOME;
    constructor(public payload: { netIncome: number }) {}
}

export class SetHourlyRate implements Action {
    readonly type = ActionTypes.SET_HOURLY_RATE;
    constructor(public payload: { hourlyRate: number }) {}
}

export class SetWeeklyHours implements Action {
    readonly type = ActionTypes.SET_WEEKLY_HOURS;
    constructor(public payload: { weeklyHours: number }) {}
}

export class SetDailyCommute implements Action {
    readonly type = ActionTypes.SET_DAILY_COMMUTE;
    constructor(public payload: { dailyCommute: number }) {}
}

export type ActionsUnion = SetGrossIncome | SetNetIncome | SetWeeklyHours | SetHourlyRate | SetDailyCommute;
