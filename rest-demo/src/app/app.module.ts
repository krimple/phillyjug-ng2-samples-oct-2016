import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RestDemoComponent } from './rest/rest-demo.component';
import { CustomerListComponent } from './rest/components/customer-list/customer-list.component';
import { CustomerFormComponent } from './rest/components/customer-form/customer-form.component';
import { CustomerRESTService } from './rest/services/customer-rest.service';

@NgModule({
  declarations: [
    RestDemoComponent,
    CustomerListComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [CustomerRESTService],
  bootstrap: [RestDemoComponent]
})
export class AppModule { }
