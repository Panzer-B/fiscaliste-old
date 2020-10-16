import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup} from "@angular/forms";
import { SetGrossIncome, SetHourlyRate, SetWeeklyHours } from "../../store/person.action";
import { AppState } from "../../store/reducers";
import { select, Store } from "@ngrx/store";
import {combineLatest, Observable, race} from "rxjs";
import { debounceTime, first, map } from "rxjs/operators";
import {
    personTaxReturnOnRRSP,
    selectPersonGrossIncome, selectPersonHourlyNetIncome,
    selectPersonHourlyRate, selectPersonMaxRRSP,
    selectPersonNetIncome,
    selectPersonWeeklyHours
} from "../../store/person.selector";
import { DebounceTime } from "../../app.config";
import { calculateTaxes } from "../../core/taxes/income.calculator";
import {
    compoundValueByMonths,
    getCompoundAddedValue, getCompoundAddedValueRRSP,
    getCompoundValueRRSP,
    getTaxReturnOnRRSP
} from "../../store/helper";

@Component({
    selector: 'app-true-cost',
    templateUrl: './true-cost.component.html',
    styleUrls: ['./true-cost.component.scss']
})
export class TrueCostComponent implements OnInit {

    // forms
    formGroup: FormGroup;
    costControl: FormControl;
    tipControl: FormControl;

    // params
    yearsOfInvestments = 25;
    yearlyRate = 5;
    interest = 0.05;

    // results
    fakeResult = 0;
    tax: number;
    isTipAdded: boolean;
    realCost: number; // Cost with taxes & tip added.
    result = 0;
    compoundValue = 0;
    compoundValueRRSP = 0;
    compoundAddedValue = 0;
    compoundAddedValueRRSP = 0;

    personHourlyHours$: Observable<number>;

    constructor(private _store: Store<AppState>) {
    }

    ngOnInit() {
        this.personHourlyHours$ = this._store.pipe(select(selectPersonWeeklyHours));
        this.costControl = new FormControl(null);
        this.tipControl = new FormControl(null);

        this.formGroup = new FormGroup({
            'costControl': this.costControl,
            'tipControl': this.tipControl
        });

        this.formGroup.valueChanges
            .pipe(
                debounceTime(1),
            )
            .subscribe((changes) => {
                console.log(changes);
                let hourlyNetIncome;
                const _value = changes.costControl;
                this.tax = _value/100 * 15;
                this.realCost = _value + this.tax;
                if (this.tipControl.value === true) {
                    this.realCost += this.tax;
                }

                this._store.pipe(select(selectPersonHourlyNetIncome, first())).subscribe((_hourlyNetIncome) => {
                    this.result = Math.round((this.realCost / _hourlyNetIncome) * 100) / 100;
                });

                const t0 = performance.now();

                let grossIncome: number;

                this._store.pipe(
                    select(selectPersonGrossIncome)
                ).subscribe((_grossIncome) => {
                    grossIncome = _grossIncome;
                });

                const months = this.yearsOfInvestments * 12;
                const monthlyRate = Math.round(this.interest / 12 * 100000) / 100000;

                this.compoundValue = compoundValueByMonths(this.realCost, months, this.yearlyRate);
                this.compoundAddedValue = getCompoundAddedValue(this.realCost, months, this.yearlyRate);
                this.compoundValueRRSP =getCompoundValueRRSP(grossIncome, this.realCost, months, this.yearlyRate);
                this.compoundAddedValueRRSP = getCompoundAddedValueRRSP(grossIncome, this.realCost, months, this.yearlyRate);


                const t1 = performance.now();
                console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
            });


        this.costControl.setValue(100, {emitEvent: true});
    }
}
