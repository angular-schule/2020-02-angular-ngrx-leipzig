import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';


interface MyState {
  counter: number;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private input$ = new Subject<string>();
  private initialState: MyState = {
    counter: 0,
    city: 'Leipzig'
  }

  state$ = this.input$.pipe(
    startWith('INIT'),
    scan(this.reducer, this.initialState)
  );

  private reducer(state: MyState, msg: string): MyState {
    switch (msg) {
      case 'INC': return { ...state, counter: state.counter + 1 };
      case 'DEC': return { ...state, counter: state.counter - 1 };
      case 'RESET': return { ...state, counter: 0 };
      default: return state;
    }
  }

  constructor() {
    this.state$.subscribe(console.log);
  }

  dispatch(input: string) {
    this.input$.next(input);
  }
}
