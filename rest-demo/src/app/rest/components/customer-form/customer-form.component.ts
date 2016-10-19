import { Component, Output, Input } from '@angular/core/src/metadata/directives';
import { EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerRESTService } from '../../services/customer-rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { rangeValidator } from '../../range.validator';

@Component({
  selector: 'rest-customer-form',
  templateUrl: 'customer-form.component.html'
})

export class CustomerFormComponent implements OnChanges, OnInit {

  @Output() refresh = new EventEmitter<boolean>();
  @Input() customer: Customer;
  private customerFormGroup: FormGroup;
  displayCustomer: Customer;

  constructor(private service: CustomerRESTService,
              private formBuilder: FormBuilder) {
      this.customerFormGroup = this.formBuilder.group({
        'id': [null],
        'name': [null, Validators.required],
        'numSales': ['0', rangeValidator(0, 100000)]
      });
  }

  
  ngOnInit():void {
    this.customerFormGroup.valueChanges
     .subscribe(customer => {
       console.log('the times they are changing ...');
       this.displayCustomer = customer;
     });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes are a comin');
    console.dir(changes);
    if (changes['customer'] !== undefined) {
      console.log('customer changes inbound', changes);
      let customer = changes['customer']['currentValue'];
      let displayCustomer = customer;
      this.customerFormGroup = this.formBuilder.group({
        'id': customer.id,
        'name': [customer.name, Validators.required],
        'numSales': [customer.numSales, rangeValidator(0, 100000)]
      });
    }
  }

  saveOrUpdate(customerForm) {
    console.log('Saving or updating', customerForm);
    console.dir(customerForm);
    this.customer = null;
    // convert to model
    // TODO - capture success or error
    this.service.saveOrUpdate(new Customer(customerForm.id, customerForm.name, customerForm.numSales))
      .subscribe(
        () => {
          this.refresh.emit(true);
        },
        (error) => {
          console.error('save or update failed.', error);
          this.refresh.emit(false);
        });
  }


}