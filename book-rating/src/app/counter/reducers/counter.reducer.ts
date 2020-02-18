import { Action, createReducer, on } from '@ngrx/store';
import * as CounterActions from '../actions/counter.actions';

export const counterFeatureKey = 'counter';

export interface State {
  counter: number;
  city: string;
}

export const initialState: State = {
  counter: 0,
  city: 'Leipzig'
};

const counterReducer = createReducer(
  initialState,

  on(CounterActions.loadCounters, state => state),

  on(CounterActions.increment, state => {
    return {
      ...state,
      counter: state.counter + 1
    };
  }),

  on(CounterActions.decrement, state => {
    return {
      ...state,
      counter: state.counter - 1
    };
  }),

  on(CounterActions.reset, state => {
    return {
      ...state,
      counter: 0
    };
  }),

);

export function reducer(state: State | undefined, action: Action) {
  return counterReducer(state, action);
}
