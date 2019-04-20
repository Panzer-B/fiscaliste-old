import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-revenu',
    templateUrl: './revenu.component.html',
    styleUrls: ['./revenu.component.scss']
})
export class RevenuComponent implements OnInit {

    form:FormGroup;
    revenuControl:FormControl;
    constructor() {
        this.revenuControl = new FormControl(null, []);
        this.form = new FormGroup({
            'revenuControl': this.revenuControl
        })
    }

    ngOnInit() {
    }

}
