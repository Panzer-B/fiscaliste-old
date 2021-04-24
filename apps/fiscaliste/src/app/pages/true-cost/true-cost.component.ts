import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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

    // params
    yearsOfInvestments = 25;
    months: number;
    yearlyRate = 5;
    interest = 0.05;
    tipRate = 0.15;
    taxRate = 0.15;

    // results
    tax: number;
    realCost: number; // Cost with taxes & tip added.
    result = 0;

    personHourlyHours$: Observable<number>;
    grossIncome: number;

    constructor(private _store: Store<AppState>) {
    }

    ngOnInit() {
        this.months = this.yearsOfInvestments / 12;
        this.personHourlyHours$ = this._store.pipe(select(selectPersonWeeklyHours));
        this.costControl = new FormControl(null);
        this.taxControl = new FormControl(null);
        this.tipControl = new FormControl(null);

        this.formGroup = new FormGroup({
            'costControl': this.costControl,
            'tipControl': this.tipControl,
            'taxControl': this.taxControl,
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
                this.realCost = _cost;

                if (this.tipControl.value === true) {
                    this.realCost += _cost * this.tipRate;
                }

                if (this.taxControl.value === true) {
                    this.realCost += _cost * this.taxRate;
                }

                this._store.pipe(select(selectPersonHourlyNetIncome, first())).subscribe((_hourlyNetIncome) => {
                    this.result = Math.round((this.realCost / _hourlyNetIncome) * 100) / 100;
                });


            });


        this.costControl.setValue(100, {emitEvent: true});
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

    get compoundValue() {
        return compoundValueByMonths(this.realCost, this.months, this.yearlyRate)
    }
}
