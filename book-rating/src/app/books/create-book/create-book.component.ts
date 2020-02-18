import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createBook } from '../actions/book.actions';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit() { }

  createBook(book: Book) {
    this.store.dispatch(createBook({ book }));

    /*this.bs.create(book).subscribe(() => {
      this.router.navigate(['/books', book.isbn]);
    });*/
  }

}
