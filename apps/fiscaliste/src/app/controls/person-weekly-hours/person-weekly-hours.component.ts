import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/reducers";
import {selectPersonWeeklyHours} from "../../store/person.selector";
import {first} from "rxjs/operators";
import {SetWeeklyHours} from "../../store/person.action";

@Component({
    selector: 'app-person-weekly-hours',
    templateUrl: './person-weekly-hours.component.html',
    styleUrls: ['./person-weekly-hours.component.scss']
})
export class PersonWeeklyHoursComponent implements OnInit {
    @Input() formGroup: FormGroup;
    numberOfHoursControl: FormControl;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.pipe(
            select(selectPersonWeeklyHours),
            first()
        ).subscribe((weeklyHours) => {
            this.numberOfHoursControl = new FormControl(weeklyHours);
            this.formGroup.addControl('numberOfHoursControl', this.numberOfHoursControl);
        });

        this.numberOfHoursControl.valueChanges.subscribe((value: number) => {
            this.store.dispatch(new SetWeeklyHours({weeklyHours: value}));
        });
    }

}
