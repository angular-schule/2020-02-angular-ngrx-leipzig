import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as BookActions from '../actions/book.actions';
import { Book } from '../shared/book';

export const bookFeatureKey = 'book';

export interface State extends EntityState<Book> {
  loading: boolean;
}

export const bookAdapter = createEntityAdapter<Book>({
  selectId: book => book.isbn
});

export const initialState: State = bookAdapter.getInitialState({
  loading: false
});

const bookReducer = createReducer(
  initialState,

  on(BookActions.loadBooks, state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(BookActions.loadBooksSuccess, (state, action) => {
    return bookAdapter.setAll(action.books, { ...state, loading: false });
  }),

  on(BookActions.loadBooksFailure, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),

  on(BookActions.createBookSuccess, (state, action) => {
    return bookAdapter.addOne(action.book, state);
  }),

  on(BookActions.rateUp, (state, action) => {
    const update = {
      id: action.book.isbn,
      changes: {
        rating: Math.min(5, action.book.rating + 1)
      }
    };

    return bookAdapter.updateOne(update, state);
  }),

  on(BookActions.rateDown, (state, action) => {
    const update = {
      id: action.book.isbn,
      changes: {
        rating: Math.max(1, action.book.rating - 1)
      }
    };

    return bookAdapter.updateOne(update, state);
  })

);

export function reducer(state: State | undefined, action: Action) {
  return bookReducer(state, action);
}
