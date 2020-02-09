import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookComponent } from './book.component';
import { BooksTestingModule } from '../books-testing.module';
import { Book } from '../shared/book';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BooksTestingModule
      ],
      declarations: [ BookComponent ]
    })
    .overrideComponent(BookComponent, { // !! override nötig wegen OnPush
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    component.book = {
      isbn: '000',
      title: '',
      description: '',
      rating: 3,
      firstThumbnailUrl: '',
      authors: ['']
    };

    fixture.detectChanges();
  });

  it('should emit ratedUp event on doRateUp()', () => {

    component.book = {
      isbn: '',
      title: '',
      description: '',
      rating: 5,
      firstThumbnailUrl: '',
      authors: ['']
    };

    let actualBook: Book;

    component.rateUp.subscribe(b => actualBook = b );
    component.doRateUp();

    expect(actualBook).toBe(component.book);
  });

  it('should display the correct rating', () => {
    const ratingBox = fixture.debugElement.query(By.css('[data-rating-box]'));
    expect(ratingBox.nativeElement.textContent).toBe('3');

    component.book = { ...component.book, rating: 5 };
    fixture.detectChanges();
    expect(ratingBox.nativeElement.textContent).toBe('5');
  });

  it('should call doRateUp() when button is clicked', () => {
    spyOn(component, 'doRateUp').and.callThrough();

    const rateUpBtn = fixture.debugElement.query(By.css('[data-rate-up-btn]'));
    rateUpBtn.nativeElement.click();

    expect(component.doRateUp).toHaveBeenCalled();
  });
});
