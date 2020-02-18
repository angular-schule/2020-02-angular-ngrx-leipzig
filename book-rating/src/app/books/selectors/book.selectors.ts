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

export const getBooksEntities = createSelector(
  selectBookState,
  bookSelectors.selectEntities
);

export const getSelectedIsbn = createSelector(
  selectBookState,
  state => state.selectedIsbn
);

export const getSelectedBook = createSelector(
  getBooksEntities,
  getSelectedIsbn, // TODO: hier RouterSelector verwenden
  (entities, isbn) => entities[isbn]
);


export const getSingleBook = createSelector(
  getBooksEntities,
  (entities, props) => {
    const { isbn } = props;
    return entities[isbn];
  }
);

export const gsbFact = (isbn: string) => {
  return createSelector(
    getBooksEntities,
    (entities) => {
      return entities[isbn];
    }
  );
}
