import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { SetGrossIncome, SetHourlyRate, SetWeeklyHours } from "../../store/person.action";
import { AppState } from "../../store/reducers";
import { select, Store } from "@ngrx/store";
import { combineLatest, race } from "rxjs";
import { debounceTime, first, map } from "rxjs/operators";
import {
    personTaxReturnOnRRSP,
    selectPersonGrossIncome,
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
    hourlyRateControl: FormControl;
    numberOfHoursControl: FormControl;

    // params
    yearsOfInvestments = 25;
    yearlyRate = 5;
    interest = 0.05;

    // results
    fakeResult = 0;
    result = 0;
    compoundValue = 0;
    compoundValueRRSP = 0;
    compoundAddedValue = 0;
    compoundAddedValueRRSP = 0;

    constructor(private _store: Store<AppState>) {
    }

    ngOnInit() {
        this.costControl = new FormControl(null);
        this.hourlyRateControl = new FormControl(null);
        this.numberOfHoursControl = new FormControl(null);

        this.formGroup = new FormGroup({
            'costControl': this.costControl,
            'hourlyRateControl': this.hourlyRateControl,
            'numberOfHoursControl': this.numberOfHoursControl
        });

        this._store.pipe(
            select(selectPersonHourlyRate),
            first()
        ).subscribe((_hourlyRate) => {
            this.hourlyRateControl.setValue(_hourlyRate, {emitEvent: true})
        });

        this._store.pipe(
            select(selectPersonWeeklyHours),
            first()
        ).subscribe((_weeklyHours) => {
            console.log(`_weeklyHours`, _weeklyHours);
            this.numberOfHoursControl.setValue(_weeklyHours)
        });

        this.hourlyRateControl.valueChanges.subscribe((_value: number) => {
            this._store.dispatch(new SetHourlyRate({hourlyRate: _value}))
        });

        this.numberOfHoursControl.valueChanges.subscribe((_value: number) => {
            this._store.dispatch(new SetWeeklyHours({weeklyHours: _value}))
        });

        this.costControl.valueChanges
            .pipe(
                debounceTime(1000),
            )
            .subscribe((_value: number) => {
                const t0 = performance.now();

                let grossIncome: number;

                this._store.pipe(
                    select(selectPersonGrossIncome)
                ).subscribe((_grossIncome) => {
                    grossIncome = _grossIncome;
                });

                const months = this.yearsOfInvestments * 12;
                const monthlyRate = Math.round(this.interest / 12 * 100000) / 100000;

                this.compoundValue = compoundValueByMonths(_value, months, this.yearlyRate);
                this.compoundAddedValue = getCompoundAddedValue(_value, months, this.yearlyRate);
                this.compoundValueRRSP =getCompoundValueRRSP(grossIncome, _value, months, this.yearlyRate);
                this.compoundAddedValueRRSP = getCompoundAddedValueRRSP(grossIncome, _value, months, this.yearlyRate);


                const t1 = performance.now();
                console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
            });

        combineLatest(
            this._store.pipe(
                select(selectPersonNetIncome),
                map((_value) => _value / 52 / this.numberOfHoursControl.value)
            ),
            this.costControl.valueChanges
        ).subscribe(([_hourlyNetIncome, _cost]) => {
            this.fakeResult = Math.round((_cost / this.hourlyRateControl.value) * 100) / 100;
            this.result = Math.round((_cost / _hourlyNetIncome) * 100) / 100;
        });

        this.costControl.setValue(10000, {emitEvent: true});
    }
}
