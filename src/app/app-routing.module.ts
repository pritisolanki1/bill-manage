import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { PrintComponent } from './components/print/print.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewAll', pathMatch: 'full' },
  { path: 'viewAll', component: TutorialsListComponent },
  { path: 'cust/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent },

  { path: 'addCust', component: AddCustomerComponent },
  { path: 'print/:id', component: PrintComponent },
  { path: 'print', component: PrintComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
