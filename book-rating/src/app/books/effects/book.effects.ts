import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as BookActions from '../actions/book.actions';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getSelectedBook } from '../selectors/book.selectors';



@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      concatMap(() => this.bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ books })),
        catchError(error => of(BookActions.loadBooksFailure({ error }))),
      ))
    );
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.createBook),
      concatMap(({ book }) => this.bs.create(book).pipe(
        map(() => BookActions.createBookSuccess({ book }))
      ))
    );
  });

  createBookSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.createBookSuccess),
      tap(({ book }) => this.router.navigate(['/books', book.isbn]))
    );
  }, { dispatch: false });


  createBook1$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.createBook),
      withLatestFrom(this.store.pipe(select(getSelectedBook))),
      tap(args => console.log(args))
    );
  }, { dispatch: false });

  constructor(private store: Store, private actions$: Actions, private bs: BookStoreService, private router: Router) {}

}
