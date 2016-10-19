import {Component, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Rx';
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
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/last';

@Component({
    selector: 'type-ahead-search',
    template: `
<form [formGroup]="theForm">
  <input [formControl]="theForm.controls['dataEntry']"><br/>   
</form>
<ul>
  <li *ngFor="let textValue of inputChanges | async" 
     [innerText]="textValue"></li>
</ul>
{{ inputChanges | async }}
<hr>
{{ formData | json }}
  `
})
export class TypeAheadSearchComponent implements AfterViewInit {

    theForm: FormGroup;
    inputChanges: Observable<string[]>;

    constructor(fb: FormBuilder) {
      this.theForm = fb.group({
        dataEntry: ['This is the default']
      });

    }

    ngAfterViewInit() {
       let rawFeed = this.theForm.controls['dataEntry']
           .valueChanges
           // logging side-effect - great for monitoring while
           // debugging your code
           .distinctUntilChanged()
           .do((data) => {
             console.log('value change sensed', data.toUpperCase());
           })
           .sampleTime(1000);
       this.inputChanges = rawFeed.buffer(Observable.interval(5000));
           // .distinctUntilChanged()
           // .sample(Observable.interval(1000))
           // because we're mapping a collection above
          // .map((data) => [data]);
    }
}

