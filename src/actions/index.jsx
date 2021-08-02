import {
  ADD_EMAIL,
  FETCH_TRUE,
  FETCH_CURRENCY,
  DELETE_PAY,
  UPDATE_PAY,
  CURR_DATA,
  AUTHORIZED_UPDATE,
  ARCHIVE_EXPENSE,
  SHOW_ARCHIVED,
  AUTHORIZE_FILTER
} from './types';

export function isFetching() {
  return {
    type: FETCH_TRUE,
    payload: true,
  };
}

export function fetchCurrency(args) {
  return function fetchReturn(dispatch) {
    isFetching();
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        dispatch({
          type: FETCH_CURRENCY,
          payload: {
            args: {
              ...args,
              exchangeRates: data,
            },
          },
        });
      });
  };
}

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: {
    email,
  },
});

export function deletePayment(id) {
  return {
    type: DELETE_PAY,
    payload: {
      id,
    },
  };
}

export function updatePayment(id, bool) {
  return {
    type: UPDATE_PAY,
    payload: {
      id,
      bool,
    },
  };
}

export function fetchCurrencyList() {
  isFetching();
  return function returnFetch(dispatch) {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        dispatch({
          type: CURR_DATA,
          payload: {
            data,
          },
        });
      });
  };
}

export function updateAuthorized(args) {
  return {
    type: AUTHORIZED_UPDATE,
    payload: {
      args,
    },
  };
}

export function archiveExpenseItem(id) {
  return {
    type: ARCHIVE_EXPENSE,
    payload: {
      id,
    },
  };
}

export function authorizeFilter(id) {
  return {
    type: AUTHORIZE_FILTER,
    payload: {
      id,
    },
  };
}

export function showArchived(bool) {
  return {
    type: SHOW_ARCHIVED,
    payload: {
      bool,
    },
  };
}
