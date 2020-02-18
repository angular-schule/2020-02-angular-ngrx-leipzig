import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadBooks, rateUp } from './actions/book.actions';
import { getBooks, getLoading } from './selectors/book.selectors';
import { Book } from './shared/book';

@Injectable({
  providedIn: 'root'
})
export class BookFacadeService {

  loading$ = this.store.pipe(select(getLoading));

  constructor(private store: Store) { }

  getBooks() {
    this.store.dispatch(loadBooks());
    return this.store.pipe(select(getBooks));
  }

  rateUp(book: Book) {
    this.store.dispatch(rateUp({ book }));
  }
}
