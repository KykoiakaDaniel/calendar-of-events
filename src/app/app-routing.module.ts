import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';


const routes: Routes = [
  { path: '', component: MonthComponent },
  { path: 'day-calendar/:date', component: DayComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
