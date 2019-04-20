import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { SetIncome } from "../store/person.action";
import { AppState } from "../store/reducers";

@Component({
    selector: 'app-revenu',
    templateUrl: './revenu.component.html',
    styleUrls: ['./revenu.component.scss']
})
export class RevenuComponent implements OnInit {

    form: FormGroup;
    revenuControl: FormControl;

    constructor(private _store: Store<AppState>) {
        this.buildForm();
        this.addEvents();
    }

    private buildForm() {
        this.revenuControl = new FormControl(null, []);
        this.form = new FormGroup({
            'revenuControl': this.revenuControl
        });
    }

    private addEvents() {
        this.revenuControl.valueChanges.subscribe((value) => {
            console.log('valueChanges : ', value);
            this._store.dispatch(new SetIncome({income: value}));
        });
    }

    ngOnInit() {
    }

}
