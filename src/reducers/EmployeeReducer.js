// https://github.com/reactjs/redux/blob/master/docs/basics/Reducers.md
import {
  EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    default:
      console.log('ACTION =>>>>', action);
      return state;
  }
}
