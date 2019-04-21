import { Component } from '@angular/core';
import { CalculatorService } from "./calculator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fiscaliste';

  constructor(private _calculatorService: CalculatorService){}
}
