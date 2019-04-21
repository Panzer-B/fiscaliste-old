import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './store/reducers';
import {RevenuComponent} from './income/income.component';
import {ReactiveFormsModule} from "@angular/forms";
import { TotalComponent } from './total/total.component';

@NgModule({
    declarations: [
        AppComponent,
        RevenuComponent,
        TotalComponent
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
}
