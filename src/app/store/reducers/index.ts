import {
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { personReducer } from "../person.reducer";
import { PersonState } from "../person.state";

export interface AppState {
    person: PersonState
}

export const reducers: ActionReducerMap<AppState> = {
    person: personReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
