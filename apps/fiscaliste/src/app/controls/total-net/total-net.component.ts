import { Component, OnInit } from '@angular/core';
import { AppState } from "../../store/reducers";
import { select, Store } from "@ngrx/store";
import { selectPersonNetIncome } from "../../store/person.selector";

@Component({
    selector: 'app-total-net',
    templateUrl: './total-net.component.html',
    styleUrls: ['./total-net.component.scss']
})
export class TotalNetComponent implements OnInit {

    total: number;

    constructor(private _store: Store<AppState>) {
        this._store.pipe(
            select(selectPersonNetIncome)
        ).subscribe((value) => {
            this.total = value;
        });
    }

    ngOnInit() {
    }

}
