import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { Store, select } from '@ngrx/store';
import { selectBook } from '../actions/book.actions';
import { getSelectedBook } from '../selectors/book.selectors';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$ = this.store.pipe(select(getSelectedBook));

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('isbn')),
    ).subscribe(isbn => this.store.dispatch(selectBook({ isbn })));

  }

}
