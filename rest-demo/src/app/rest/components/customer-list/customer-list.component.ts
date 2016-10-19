import { Component, Input, Output, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../../models/customer';
import { rangeValidator } from '../../range.validator';
import { CustomerRESTService } from '../../services/customer-rest.service';
import HttpResponse = http.HttpResponse;


@Component({
  selector: 'rest-customer-list',
  templateUrl: 'customer-list.component.html'
})
export class CustomerListComponent {

  customers: Customer[];
  // the customer to edit (in our child tag, rest-customer-form)
  customer: Customer;

  constructor(private service: CustomerRESTService) {
    let componentReference = this; // async methods don't always fix 'this' in arrow functions in ES2015 :(
    this.reloadCustomers();
    // every time the form saves a new customer or updates an existing customer it sends back a response
    // in the observable event emitter...  We reload the list then!
  }

  edit(customer) {
    this.customer = customer;
  }

  add() {
    this.customer = new Customer();
  }

  reloadCustomers() {
    this.service.load()
      .subscribe(
        (customers: Customer[]) => {
          this.customers = customers;
        },
        (error) => {
          alert('Load failed! See console...');
          console.dir(error);
        },
        () => {
          // these are one-shot with HTTP GET - they close immediately after fetching
          console.log('load() finished.');
        });
  }
}

