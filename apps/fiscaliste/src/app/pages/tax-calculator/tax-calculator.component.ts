import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-tax-calculator',
    templateUrl: './tax-calculator.component.html',
    styleUrls: ['./tax-calculator.component.scss']
})
export class TaxCalculatorComponent implements OnInit {

    formGroup:FormGroup;
    taxControl: FormControl;
    isResultVisible:boolean;
    constructor() {
    }

    get taxWidth(){
        return this.taxControl.value * 800 / 114000;
    }

    ngOnInit() {
        this.taxControl = new FormControl(null);
        this.formGroup = new FormGroup({
            'taxControl': this.taxControl
        });
    }
    calculate(){
        this.isResultVisible = true;
    }
}
