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

    // params
    yearsOfInvestments = 25;
    months: number;
    yearlyRate = 5;
    interest = 0.05;

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
        this.tipControl = new FormControl(null);

        this.formGroup = new FormGroup({
            'costControl': this.costControl,
            'tipControl': this.tipControl
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
                this.tax = _cost / 100 * 15;
                this.realCost = _cost + this.tax;
                if (this.tipControl.value === true) {
                    this.realCost += this.tax;
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
