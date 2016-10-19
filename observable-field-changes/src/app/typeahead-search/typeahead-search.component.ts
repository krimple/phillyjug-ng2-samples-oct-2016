import {Component, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/sample';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-type-ahead-search',
    template: `
      <form [formGroup]="theForm">
        <input formControlName="dataEntry"><br/>   
      </form>
      <ul>
        <li *ngFor="let textValue of incomingData" 
           [innerText]="textValue"></li>
      </ul>
      <hr>
      {{ formData | json }}
    `
})
export class TypeAheadSearchComponent implements AfterViewInit {

    theForm: FormGroup;

    incomingData: string[];

    constructor(fb: FormBuilder) {
      this.theForm = fb.group({
        dataEntry: ['']
      });
    }

    ngAfterViewInit() {
      let component = this;
      this.theForm.controls['dataEntry']
        .valueChanges
        .map((x) => x.split(' '))
        .subscribe(
          (incoming) => {
            component.incomingData = incoming;
          });
    }
}

// .do((data) => {
//      console.log('value change sensed', data);
//  })
// .sampleTime(1000);
// logging side-effect - great for monitoring while
// debugging your code
//.distinctUntilChanged()
//this.inputChanges = rawFeed.buffer(Observable.interval(5000));
// .distinctUntilChanged()
// .sample(Observable.interval(1000))
// because we're mapping a collection above
// .map((data) => [data]);

