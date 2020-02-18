import { Component, OnInit } from '@angular/core';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { loadBooks, rateUp, rateDown } from '../actions/book.actions';
import { getLoading, getBooks } from '../selectors/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[];
  loading$ = this.store.pipe(select(getLoading));
  books$ = this.store.pipe(select(getBooks));

  constructor(private bs: BookStoreService, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadBooks());
  }

  rateUp(book: Book) {
    this.store.dispatch(rateUp({ book }))
  }

  rateDown(book: Book) {
    this.store.dispatch(rateDown({ book }));
  }

  trackBook(index: number, item: Book) {
    return item.isbn;
  }
}
