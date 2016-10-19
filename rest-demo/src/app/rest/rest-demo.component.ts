import { Component } from '@angular/core';

@Component({
    selector: 'rest-demo',
    template: `
    <article class="card">
        <header><h2>REST Observable Demo</h2></header>
        <rest-customer-list></rest-customer-list>
    </article>
  `
})
export class RestDemoComponent { }

