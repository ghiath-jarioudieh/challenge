import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ReportListComponent } from './report-list/report-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'report-list', pathMatch: 'full'},
  { path: 'report-list', component: ReportListComponent},
  { path: 'report-list/:id/:name', component: ReportListComponent},
  { path: 'report-details/:id', component: ReportDetailsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
