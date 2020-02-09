import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookStoreService } from './book-store.service';

describe('BookStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule    ]
  }));

  it('should be created', () => {
    const service: BookStoreService = TestBed.get(BookStoreService);
    expect(service).toBeTruthy();
  });
});
