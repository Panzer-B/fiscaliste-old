import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store/reducers';
import { IncomeComponent } from './controls/income/income.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TotalNetComponent } from './controls/total-net/total-net.component';
import { IncomeJobComponent } from './controls/income/income-job/income-job.component';
import { CalculatorService } from "./core/services/calculator.service";
import { TrueCostComponent } from './pages/true-cost/true-cost.component';
import { TaxCalculatorComponent } from './pages/tax-calculator/tax-calculator.component';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
    declarations: [
        AppComponent,
        IncomeComponent,
        TotalNetComponent,
        IncomeJobComponent,
        TrueCostComponent,
        TaxCalculatorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: false
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private _calculatorService: CalculatorService
    ) {
    }
}
