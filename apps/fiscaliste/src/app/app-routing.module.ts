import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxCalculatorComponent } from "./pages/tax-calculator/tax-calculator.component";
import { TrueCostComponent } from "./pages/true-cost/true-cost.component";

const routes: Routes = [
    { path: '', pathMatch: 'prefix', redirectTo: 'true-cost'},
    { path: 'tax-calculator', component: TaxCalculatorComponent },
    { path: 'true-cost', component: TrueCostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
