import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-true-cost',
    templateUrl: './true-cost.component.html',
    styleUrls: ['./true-cost.component.scss']
})
export class TrueCostComponent implements OnInit {

    formGroup: FormGroup;
    costControl: FormControl;
    hourlyRateControl: FormControl;
    numberOfHoursControl: FormControl;
    result = 0;

    constructor() {
    }

    ngOnInit() {
        this.costControl = new FormControl(null);
        this.hourlyRateControl = new FormControl(null);
        this.numberOfHoursControl = new FormControl(null);
        this.formGroup = new FormGroup({
            'costControl': this.costControl,
            'hourlyRateControl': this.hourlyRateControl,
            'numberOfHoursControl': this.numberOfHoursControl
        });

        this.formGroup.valueChanges.subscribe((_values) => {
            console.log(`_values`, _values);
            // cost: 1000;
            // rate: 40;
            // hours: 35
            // your salary...
            this.result = Math.round((_values.costControl / _values.hourlyRateControl)*100)/100;

        })
    }

}
