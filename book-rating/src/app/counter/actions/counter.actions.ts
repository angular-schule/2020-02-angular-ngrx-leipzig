import { createAction, props } from '@ngrx/store';

export const loadCounters = createAction(
  '[Counter] Load Counters'
);

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
