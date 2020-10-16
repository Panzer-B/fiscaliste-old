import { Injectable } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { AppState } from "../../store/reducers";
import { selectPersonGrossIncome } from "../../store/person.selector";
import { SetNetIncome } from "../../store/person.action";
import { calculateTaxes } from "../taxes/income.calculator";

@Injectable({
    providedIn: 'root'
})
export class CalculatorService {

    // TODO : replace by effects.
    constructor(private _store: Store<AppState>) {
        this._store
            .pipe(
                select(selectPersonGrossIncome)
            )
            .subscribe((value) => {
                let netIncome = 0;
                netIncome = calculateTaxes(value);
                this._store.dispatch(new SetNetIncome({netIncome: netIncome}));
            });
    }
}
