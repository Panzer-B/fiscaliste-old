import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/reducers";
import {selectPersonHourlyRate} from "../../store/person.selector";
import {first} from "rxjs/operators";
import {SetHourlyRate} from "../../store/person.action";

@Component({
    selector: 'app-person-hourly-rate-income',
    templateUrl: './person-hourly-rate-income.component.html',
    styleUrls: ['./person-hourly-rate-income.component.scss']
})
export class PersonHourlyRateIncomeComponent implements OnInit {
    @Input() formGroup: FormGroup;
    hourlyRateControl: FormControl;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.pipe(
            select(selectPersonHourlyRate),
            first()
        ).subscribe((_hourlyRate) => {
            this.hourlyRateControl = new FormControl(_hourlyRate);
            this.formGroup.addControl('hourlyRateControl', this.hourlyRateControl);
        });

        this.hourlyRateControl.valueChanges.subscribe((_value: number) => {
            this.store.dispatch(new SetHourlyRate({hourlyRate: _value}))
        });
    }
}
