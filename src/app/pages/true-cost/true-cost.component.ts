import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { SetGrossIncome, SetHourlyRate, SetWeeklyHours } from "../../store/person.action";
import { AppState } from "../../store/reducers";
import { select, Store } from "@ngrx/store";
import { combineLatest, race } from "rxjs";
import { debounceTime, first, map } from "rxjs/operators";
import {
    selectPersonGrossIncome,
    selectPersonHourlyRate, selectPersonMaxRRSP,
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

                let grossIncome = 0;
                this._store.pipe(
                    select(selectPersonGrossIncome)
                ).subscribe((_grossIncome) => {
                    grossIncome = _grossIncome;
                });

                const months = this.yearsOfInvestments * 12;
                const monthlyRate = Math.round(this.interest / 12 * 100000) / 100000;
                console.log(`monthlyRate`, monthlyRate);
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
                    compoundValue = compoundValue * (1 + monthlyRate);

                    // RRSP
                    if (i % 12 === 0 && i !== 0) {
                        rrspTaxReturn = this.getTaxReturnOnRRSP(grossIncome, rrspInvestment);
                        rrspInvestment = rrspTaxReturn;

                        compoundValueRRSP = (compoundValueRRSP + rrspTaxReturn) * (1 + monthlyRate);
                    } else {
                        compoundValueRRSP = compoundValueRRSP * (1 + monthlyRate);
                    }

                    // Yearly investment
                    if (i % 12 === 0 && i !== 0) {
                        compoundAddedValue = (compoundAddedValue + _value) * (1 + monthlyRate);
                    } else {
                        compoundAddedValue = compoundAddedValue * (1 + monthlyRate);
                    }

                    // Yearly investment RRSP
                    if (i % 12 === 0 && i !== 0) {
                        // RRSP
                        rrspYearlyTaxReturn = this.getTaxReturnOnRRSP(grossIncome, rrspYearlyInvestment);
                        rrspYearlyInvestment = rrspYearlyTaxReturn + _value;
                        compoundAddedValueRRSP = (compoundAddedValueRRSP + _value + rrspYearlyTaxReturn) * (1 + monthlyRate);

                    } else {
                        compoundAddedValueRRSP = compoundAddedValueRRSP * (1 + monthlyRate);
                    }
                    if (i === months-1) {
                        console.log(`compoundAddedValueRRSP * (7 / 100)`, compoundAddedValueRRSP * 0.07);
                    }
                }
                this.compoundValue = Math.round(compoundValue * 100) / 100;
                this.compoundAddedValue = Math.round(compoundAddedValue * 100) / 100;
                this.compoundValueRRSP = Math.round(compoundValueRRSP * 100) / 100;
                this.compoundAddedValueRRSP = Math.round(compoundAddedValueRRSP * 100) / 100;


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

    private getTaxReturnOnRRSP(_grossIncome, _rrspInvestment) {
        const netIncome = calculateTaxes(_grossIncome);
        const maxRRSP = _grossIncome / 100 * 18;
        const substract = _rrspInvestment >= maxRRSP ? maxRRSP : _rrspInvestment;
        const trueIncome = calculateTaxes(_grossIncome - substract);
        return Math.round((netIncome - trueIncome) * 100) / 100;
    }
}
