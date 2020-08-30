import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { DatePipe } from '@angular/common';
import { PrintComponent } from './components/print/print.component';
import { NgxPrintModule } from 'ngx-print';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { FillRowsPipe } from './components/print/FillRowsPipe';
import { BoldPipe } from './components/add-customer/bold.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    PrintComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    AddCustomerComponent,
    FillRowsPipe,
    BoldPipe
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule
  ],
  exports:[FillRowsPipe],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
