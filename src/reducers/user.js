import {
  ADD_EMAIL,
} from '../actions/types';

const initialState = {
  email: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
}
