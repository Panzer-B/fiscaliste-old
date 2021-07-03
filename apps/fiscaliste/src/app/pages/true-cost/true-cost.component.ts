import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AppState} from "../../store/reducers";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {debounceTime, first} from "rxjs/operators";
import {
    selectPersonGrossIncome,
    selectPersonHourlyNetIncome,
    selectPersonWeeklyHours
} from "../../store/person.selector";
import {
    compoundValueByMonths,
    getCompoundAddedValue,
    getCompoundAddedValueRRSP,
    getCompoundValueRRSP,
} from "../../store/helper";

@Component({
    selector: 'app-true-cost',
    templateUrl: './true-cost.component.html',
    styleUrls: ['./true-cost.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrueCostComponent implements OnInit {

    // forms
    formGroup: FormGroup;
    costControl: FormControl;
    tipControl: FormControl;
    taxControl: FormControl;
    paymentsFrequency: FormControl;
    frequencyControl: FormControl;

    // params
    yearsOfInvestments = 25;
    months: number;
    yearlyRate = 0.07;
    tipRate = 0.15;
    taxRate = 0.15;

    // results
    tax: number;
    realCost: number; // Cost with taxes & tip added.
    result = 0;

    personWeeklyHours$: Observable<number>;
    grossIncome: number;

    constructor(private _store: Store<AppState>, private _ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.months = this.yearsOfInvestments * 12;
        this.personWeeklyHours$ = this._store.pipe(select(selectPersonWeeklyHours));
        this.paymentsFrequency = new FormControl(1);
        this.costControl = new FormControl(null);
        this.taxControl = new FormControl(null);
        this.tipControl = new FormControl(null);
        this.frequencyControl = new FormControl(1);

        this.formGroup = new FormGroup({
            'costControl': this.costControl,
            'tipControl': this.tipControl,
            'taxControl': this.taxControl,
            'paymentsFrequency': this.paymentsFrequency,
            'frequencyControl': this.frequencyControl
        });

        this._store.pipe(
            select(selectPersonGrossIncome)
        ).subscribe((grossIncome) => {
            this.grossIncome = grossIncome;
        });

        this.formGroup.valueChanges
            .pipe(
                debounceTime(1),
            )
            .subscribe((changes) => {
                console.log(changes);
                const _cost = changes.costControl;
                const paymentsFrequency = changes.paymentsFrequency;
                let freqMultiplier = changes.frequencyControl;
                this.realCost = _cost;

                if (this.tipControl.value === true) {
                    this.realCost += _cost * this.tipRate;
                }

                if (this.taxControl.value === true) {
                    this.realCost += _cost * this.taxRate;
                }

                this.realCost = this.realCost * paymentsFrequency * freqMultiplier;

                this._store.pipe(select(selectPersonHourlyNetIncome, first())).subscribe((_hourlyNetIncome) => {
                    this.result = Math.round((this.realCost / _hourlyNetIncome) * 100) / 100;
                });

                this._ref.detectChanges();
            });

        this.costControl.setValue(100, {emitEvent: true});
    }

    get compoundValue(): number {
        console.log(`this.realCost`, this.realCost);
        console.log(`this.months`, this.months);
        console.log(`this.yearlyRate`, this.yearlyRate);
        const total = compoundValueByMonths(this.realCost, this.months, this.yearlyRate)
        console.log(`total`, total);
        return total;
    }

    get compoundAddedValueRRSP() {
        return getCompoundAddedValueRRSP(this.grossIncome, this.realCost, this.months, this.yearlyRate);
    }

    get compoundValueRRSP() {
        return getCompoundValueRRSP(this.grossIncome, this.realCost, this.months, this.yearlyRate);
    }

    get compoundAddedValue() {
        return getCompoundAddedValue(this.realCost, this.months, this.yearlyRate);
    }


}
