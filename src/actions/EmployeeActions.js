import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEES_FETCH_SUCCESS,
} from './types';
import { Actions } from 'react-native-router-flux';
import Api from '../api'

export const employeeUpdate = ({ prop, value }) => {
    return {
      type: EMPLOYEE_UPDATE,
      payload: { prop, value }
    }
};

export const employeeCreate = ({ name, phone, shift }) => {
  console.log('name, phone, shift => ', name, phone, shift);
  return (dispatch) => {
    dispatch({ type: EMPLOYEE_CREATE })
    Api.createEmployee({ name, phone, shift })
    .then(() => Actions.employeeList({}));
    // .then(() => Actions.employeeList({ type: 'reset' }));
  }
  // Call api qui crée l'employée
};

export const employeesFetch = () => {
  return (dispatch) => {
    Api.listEmployee()
    .then((data) => dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: data }));
  }
}

export const employeeSave = ({ name, phone, shift, id }) => {
  return (dispatch) => {
    dispatch({ type: EMPLOYEE_SAVE_SUCCESS })
    Api.saveEmployee({ id, name, phone, shift })
    .then(() => Actions.employeeList({}));
  }
};

export const employeeDelete = (id) => {
  return (dispatch) => {
    dispatch({ type: EMPLOYEE_DELETE_SUCCESS })
    Api.destroyEmployee(id)
    .then(() => Actions.employeeList({}));
  }
};
