import {Component, OnInit} from '@angular/core';
import { select, Store } from "@ngrx/store";
import { selectPersonGrossIncome } from "../store/person.selector";
import { AppState } from "../store/reducers";

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {

    total:number;

    constructor(
        private _store: Store<AppState>
    ) {
        this._store.pipe(
            select(selectPersonGrossIncome)
        ).subscribe((value) => {
            console.log('selectPersonIncome : ', value);
            this.total = value;
        });
    }

    ngOnInit() {
    }

}
