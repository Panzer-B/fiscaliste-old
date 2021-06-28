import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {selectPersonDailyCommute} from "../../store/person.selector";
import {first} from "rxjs/operators";
import {AppState} from "../../store/reducers";
import {SetDailyCommute} from "../../store/person.action";

@Component({
    selector: 'fiscaliste-person-daily-commute',
    templateUrl: './person-daily-commute.component.html',
    styleUrls: ['./person-daily-commute.component.scss']
})
export class PersonDailyCommuteComponent implements OnInit {
    @Input() formGroup: FormGroup;
    dailyCommuteControl: FormControl;
    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store.pipe(
            select(selectPersonDailyCommute),
            first()
        ).subscribe((dailyCommute) => {
            this.dailyCommuteControl = new FormControl(dailyCommute);
            this.formGroup.addControl('dailyCommuteControl', this.dailyCommuteControl);
        });

        this.dailyCommuteControl.valueChanges.subscribe((value: number) => {
            this.store.dispatch(new SetDailyCommute({dailyCommute: value}));
        });
    }
}
