import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from '../reducers/book.reducer';

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

const bookSelectors = fromBook.bookAdapter.getSelectors();

export const getLoading = createSelector(
  selectBookState,
  state => state.loading
);

export const getBooks = createSelector(
  selectBookState,
  bookSelectors.selectAll
);
