import { Component } from '@angular/core';

import { StateService } from '../state.service';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { increment, reset, decrement } from '../actions/counter.actions';
import { getCounter } from '../selectors/counter.selectors';

@Component({
  selector: 'br-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  counter$ = this.store.pipe(select(getCounter));

  constructor(private store: Store) { }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

}
