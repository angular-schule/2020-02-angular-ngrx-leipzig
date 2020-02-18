import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Book } from '../shared/book';

export const loadBooks = createAction(
  '[Book] Load Books'
);

export const loadBooksSuccess = createAction(
  '[Book] Load Books Success',
  props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
  '[Book] Load Books Failure',
  props<{ error: HttpErrorResponse }>()
);


export const createBook = createAction(
  '[Book] Create Book',
  props<{ book: Book }>()
);

export const createBookSuccess = createAction(
  '[Book] Create Book Success',
  props<{ book: Book }>()
);

export const rateUp = createAction(
  '[Book] Rate Up',
  props<{ book: Book }>()
);

export const rateDown = createAction(
  '[Book] Rate Down',
  props<{ book: Book }>()
);

export const selectBook = createAction(
  '[Book] Select Book',
  props<{ isbn: string }>()
);
