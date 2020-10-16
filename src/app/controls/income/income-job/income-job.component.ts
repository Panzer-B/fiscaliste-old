import { SetGrossIncome } from '../../../store/person.action';
import { DebounceTime } from '../../../app.config';
import { AppState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

@Component({
    selector: 'app-income-job',
    templateUrl: './income-job.component.html',
    styleUrls: ['./income-job.component.scss']
})
export class IncomeJobComponent implements OnInit {

    @Input() formGroup: FormGroup;
    @Input() updateStore: Observable<any>;
    jobControl: FormControl;

    constructor(private _store: Store<AppState>) {
        this.jobControl = new FormControl(null, []);
    }

    ngOnInit() {
        this.formGroup.addControl('jobControl', this.jobControl);
        this.jobControl.valueChanges
            .pipe(
                debounceTime(DebounceTime),
                map(value => !!value ? parseInt(value, 10) : 0)
            )
            .subscribe((value) => {
                this._store.dispatch(new SetGrossIncome({grossIncome: value}));
            });
    }

}
