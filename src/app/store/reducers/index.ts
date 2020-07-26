import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { personReducer } from "../person.reducer";
import { PersonState } from "../person.state";
import { localStorageSync } from "ngrx-store-localstorage";

export interface AppState {
    person: PersonState
}

export const reducers: ActionReducerMap<AppState> = {
    person: personReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            'person'
        ],
        rehydrate: true
    })(reducer);
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
