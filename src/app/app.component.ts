import {Component} from '@angular/core';
import {CalculatorService} from "./core/services/calculator.service";
import {of, range} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'fiscaliste';

    constructor() {

    }
}
