import { Component } from '@angular/core';

import { StateService } from '../state.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'br-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  counter$ = this.service.state$.pipe(map(state => state.counter));

  constructor(private service: StateService) { }

  increment() {
    this.service.dispatch('INC');
  }

  decrement() {
    this.service.dispatch('DEC');
  }

  reset() {
    this.service.dispatch('RESET');
  }

}
