import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store/reducers';
import { IncomeComponent } from './income/income.component';
import { ReactiveFormsModule } from "@angular/forms";
import { IncomeCompanyComponent } from './income-company/income-company.component';
import { TotalNetComponent } from './total-net/total-net.component';
import { IncomeJobComponent } from './income-job/income-job.component';
import { CalculatorService } from "./core/services/calculator.service";
import { YearTabsComponent } from './year-tabs/year-tabs.component';

@NgModule({
    declarations: [
        AppComponent,
        IncomeComponent,
        IncomeCompanyComponent,
        TotalNetComponent,
        IncomeJobComponent,
        YearTabsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, {metaReducers})
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
