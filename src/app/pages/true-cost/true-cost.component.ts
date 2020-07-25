import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { SetGrossIncome } from "../../store/person.action";
import { AppState } from "../../store/reducers";
import { select, Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { first, map } from "rxjs/operators";
import { selectPersonNetIncome } from "../../store/person.selector";

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

        // Set gross income.
        combineLatest(
            this.hourlyRateControl.valueChanges,
            this.numberOfHoursControl.valueChanges
        )
            .pipe(map(([_hourlyRate, _numberOfHours]) => _hourlyRate * _numberOfHours * 52))
            .subscribe((_grossIncome) => {
                this._store.dispatch(new SetGrossIncome({grossIncome: _grossIncome }))
            });

        // calculate hours based on net income.
        this.formGroup.valueChanges.subscribe((_values) => {
            this._store.pipe(
                select(selectPersonNetIncome),
                first(),
                map((_value) => _value / 52 / _values.numberOfHoursControl)
            ).subscribe((_hourlyNetIncome) => {
                console.log(`_netIncome`, _hourlyNetIncome);
                this.fakeResult = Math.round((_values.costControl / _values.hourlyRateControl)*100)/100;
                this.result = Math.round((_values.costControl / _hourlyNetIncome)*100)/100;
            });
        })
    }

}
