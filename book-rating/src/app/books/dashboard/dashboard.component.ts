import { Component, OnInit } from '@angular/core';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { loadBooks, rateUp, rateDown } from '../actions/book.actions';
import { getLoading, getBooks } from '../selectors/book.selectors';
import { BookFacadeService } from '../book-facade.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[];
  loading$ = this.store.pipe(select(getLoading));
  books$ = this.bookFacade.getBooks();

  constructor(private bookFacade: BookFacadeService, private bs: BookStoreService, private store: Store) { }

  ngOnInit() {
  }

  rateUp(book: Book) {
    this.bookFacade.rateUp(book);
  }

  rateDown(book: Book) {
    this.store.dispatch(rateDown({ book }));
  }

  trackBook(index: number, item: Book) {
    return item.isbn;
  }
}
