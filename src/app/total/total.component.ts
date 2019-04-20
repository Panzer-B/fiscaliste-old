import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {

    total:number;
    constructor() {
        this.total = 10;
    }

    ngOnInit() {
    }

}
