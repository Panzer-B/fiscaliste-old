import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { calculatorReducer } from "../calculator.reducer";
import { PersonState } from "../calculator.selector";

export interface AppState {
    person: PersonState
}

export const reducers: ActionReducerMap<AppState> = {
    person: calculatorReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
