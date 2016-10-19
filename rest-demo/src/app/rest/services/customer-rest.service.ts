import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Customer} from '../models/customer';

@Injectable()
export class CustomerRESTService {
  constructor(private http: Http) {}

  // todo - convert to promise - not recognizing Promise type in ES2015 from typeScript
  load(): Observable<Customer[]> {
    let response = this.http.get('/customers')
      .map((datum: Response) => {
        let body = datum.json();
        return body.map((item) => {
          return new Customer(item['id'], item['name'],
            isNaN(parseFloat(item['numSales'])) ? 0 : parseFloat(item['numSales']));
        });
    });
    return response;
  }

  // todo - convert to promise - not recognizing Promise type in ES2015 from TypeScript
  saveOrUpdate(customer) {
    if (customer.id) {
      return this.http.put('/customers/' + customer.id, customer);
    } else {
      return this.http.post('/customers/', customer);
    }
  }
}
