import {
  FETCH_CURRENCY,
  DELETE_PAY,
  UPDATE_PAY,
  CURR_DATA,
  AUTHORIZED_UPDATE,
  ARCHIVE_EXPENSE,
  SHOW_ARCHIVED,
  AUTHORIZE_FILTER,
} from '../actions/types';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  expenses: [],
  currencies: [],
  upDateItemId: 0,
  bool: false,
  archived: [],
  showArchived: false,
  authFilter: false,
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENCY:
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload.args, id: uuidv4() }],
      };

    case CURR_DATA:
      return {
        ...state,
        currencies: Object.keys(action.payload.data),
      };

    case DELETE_PAY:
      return {
        ...state,
        expenses: !state.showArchived
          ? state.expenses.filter((item) => item.id !== action.payload.id)
          : state.expenses,
        archived: state.showArchived
          ? state.archived.filter((item) => item.id !== action.payload.id)
          : state.archived,
      };

    case UPDATE_PAY:
      return {
        ...state,
        bool: action.payload.bool,
        upDateItemId: action.payload.id,
      };

    case AUTHORIZED_UPDATE:
      return {
        ...state,
        expenses: state.expenses.map((item) =>
          item.id === state.upDateItemId
            ? {
                ...item,
                ...action.payload.args,
              }
            : item
        ),
        bool: false,
      };

    case ARCHIVE_EXPENSE:
      const expenseArr = state.expenses.find(
        (item) => item.id === action.payload.id
      );

      return {
        ...state,
        expenses: state.expenses.filter((item) => item !== expenseArr),
        archived: [...state.archived, expenseArr],
      };

    case SHOW_ARCHIVED:
      return {
        ...state,
        showArchived: action.payload.bool,
      };

    case AUTHORIZE_FILTER:
      const archivedArr = state.archived.find(
        (item) => item.id === action.payload.id
      );

      return {
        ...state,
        archived: state.archived.filter((item) => item !== archivedArr),
        expenses: [...state.expenses, archivedArr],
      };

    default:
      return state;
  }
}
