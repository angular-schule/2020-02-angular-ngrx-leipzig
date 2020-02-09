import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { BookComponent } from '../book/book.component';
import { BooksTestingModule } from '../books-testing.module';
import { BookRatingService } from '../shared/book-rating.service';
import { Book } from '../shared/book';
import { CreateBookComponent } from '../create-book/create-book.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    const bookRatingMock = {
      rateUp: book => book
    };
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, // wegen Integration Test,
        HttpClientTestingModule, // wegen Integration Test
        RouterTestingModule,
        BooksTestingModule
      ],
      declarations: [
        DashboardComponent,
        BookComponent, // Integration Test
        CreateBookComponent // Integration Test
      ],
      providers: [{
        provide: BookRatingService,
        useValue: bookRatingMock
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doRateUp() should forward the execution to BookRatingService', () => {

    const rs: BookRatingService = TestBed.get<BookRatingService>(BookRatingService);
    spyOn(rs, 'rateUp').and.callThrough();

    component.rateUp({ isbn: '000' } as Book);

    expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).not.toHaveBeenCalledTimes(2);
  });


  it('doRateUp() should call updateList (white-box testing)', () => {
    spyOn(component, 'updateList');
    component.rateUp({ isbn: '000' } as Book);

    expect(component.updateList).toHaveBeenCalled();
  });
});
