import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/reducers";

@Component({
    selector: 'app-income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

    form: FormGroup;

    constructor(private _store: Store<AppState>) {
        this.form = new FormGroup({});
    }

    ngOnInit() {
    }
}
