import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { SetGrossIncome, SetHourlyRate, SetWeeklyHours } from "../../store/person.action";
import { AppState } from "../../store/reducers";
import { select, Store } from "@ngrx/store";
import { combineLatest, race } from "rxjs";
import { debounceTime, first, map } from "rxjs/operators";
import {
    selectPersonGrossIncome,
    selectPersonHourlyRate,
    selectPersonNetIncome,
    selectPersonWeeklyHours
} from "../../store/person.selector";
import { DebounceTime } from "../../app.config";
import { calculateTaxes } from "../../core/taxes/income.calculator";

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

                let grossIncome = 0;
                this._store.pipe(
                    select(selectPersonGrossIncome)
                ).subscribe((_grossIncome) => {
                    grossIncome = _grossIncome;
                });

                const netIncome = calculateTaxes(grossIncome);

                const months = this.yearsOfInvestments * 12;
                const monthlyRate = Math.round(7 / 12 * 1000) / 1000;
                let compoundValue = _value;
                let compoundValueRRSP = _value;
                let compoundAddedValue = _value;
                let compoundAddedValueRRSP = _value;
                let rrspTaxReturn = 0;
                let rrspInvestment = _value;

                let rrspYearlyTaxReturn = 0;
                let rrspYearlyInvestment = _value;

                for (let i = 1; i <= months; i++) {
                    // compound
                    compoundValue = compoundValue * (1 + monthlyRate / 100);

                    // RRSP
                    if (i % 12 === 0 && i !== 0) {
                        const trueIncome = calculateTaxes(grossIncome - rrspInvestment);
                        rrspTaxReturn = Math.round((netIncome - trueIncome) * 100) / 100;
                        rrspInvestment = rrspTaxReturn;

                        compoundValueRRSP = compoundValueRRSP + rrspTaxReturn * (1 + monthlyRate / 100);
                    } else {
                        compoundValueRRSP = compoundValueRRSP * (1 + monthlyRate / 100);
                    }

                    // Yearly investment
                    if (i % 12 === 0 && i !== 0) {
                        compoundAddedValue = compoundAddedValue + _value * (1 + monthlyRate / 100);
                    } else {
                        compoundAddedValue = compoundAddedValue * (1 + monthlyRate / 100);
                    }

                    // Yearly investment RRSP
                    if (i % 12 === 0 && i !== 0) {
                        // RRSP
                        const trueIncome = calculateTaxes(grossIncome - rrspYearlyInvestment);
                        rrspYearlyTaxReturn = Math.round((netIncome - trueIncome) * 100) / 100;
                        rrspYearlyInvestment = rrspYearlyTaxReturn + _value;
                        compoundAddedValueRRSP = compoundAddedValueRRSP + _value + rrspYearlyTaxReturn * (1 + monthlyRate / 100);

                    } else {
                        compoundAddedValueRRSP = compoundAddedValueRRSP * (1 + monthlyRate / 100);
                    }
                }
                this.compoundValue = Math.round(compoundValue * 100) / 100;
                this.compoundAddedValue = Math.round(compoundAddedValue * 100) / 100;
                this.compoundValueRRSP = Math.round(compoundValueRRSP * 100) / 100;
                this.compoundAddedValueRRSP = Math.round(compoundAddedValueRRSP * 100) / 100;

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
