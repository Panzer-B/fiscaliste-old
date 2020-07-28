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

@Component({
    selector: 'app-true-cost',
    templateUrl: './true-cost.component.html',
    styleUrls: ['./true-cost.component.scss']
})
export class TrueCostComponent implements OnInit {

    formGroup: FormGroup;
    costControl: FormControl;
    hourlyRateControl: FormControl;
    numberOfHoursControl: FormControl;
    fakeResult = 0;
    result = 0;
    compoundValue = 0;

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
            const months = 25 * 12;
            const monthlyRate = Math.round(7/12*1000)/1000;
            for ( let i = 1; i <= months; i++ ) {
                _value = _value * (1 + monthlyRate / 100);
            }
            this.compoundValue = Math.round(_value * 100) / 100;
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
