import {Request, Post, Get, Put, Delete} from './request';
import User from '../models/User'

var Api = {
  userSignUp: function(email, password) {
    return fetch('http://localhost:3000/api/v1/pro_auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then((response) => User.saveAccessToken(response))
    .then((response) => response.json())
    .then((json) => { return User.create(json["data"]).then(() => User.getCurrent(json["data"]["id"])) })
    // .then(User.getPushToken)
    // .then(Api.updatePushToken)
    // .then(Api.updateLocale)

    // Mettre la méthode getCurrentUser qui throw une erreur si inscription morte

  },
  createEmployee(employee) {
    var userID = 0;
    return User.getCurrent()
    .then((user) => {
      userID = user.id
      // return Config.API_URL + '/' + Routes.Endpoint.employee
      return 'http://localhost:3000/api/v1/employees';
    })
    .then((url) => {
      return User.getAccessToken()
      .then((headers) => {
        headers['Accept'] = 'application/json'
        headers['Content-Type'] = 'application/json'

        return Post(url, headers,
        JSON.stringify({employee}))
      })
    })
  },
  saveEmployee(employee) {
    var userID = 0;
    return User.getCurrent()
    .then((user) => {
      userID = user.id
      // return Config.API_URL + '/' + Routes.Endpoint.employee
      return `http://localhost:3000/api/v1/employees/${employee.id}`;
    })
    .then((url) => {
      return User.getAccessToken()
      .then((headers) => {
        headers['Accept'] = 'application/json'
        headers['Content-Type'] = 'application/json'

        return Put(url, headers,
        JSON.stringify({employee}))
      })
    })
  },
  listEmployee() {
    var userID = 0;
    return User.getCurrent()
    .then((user) => {
      userID = user.id
      // return Config.API_URL + '/' + Routes.Endpoint.employee
      return 'http://localhost:3000/api/v1/employees';
    })
    .then((url) => {
      return User.getAccessToken()
      .then((headers) => {
        headers['Accept'] = 'application/json'
        headers['Content-Type'] = 'application/json'
        return Get(url, headers)
      })
    })
  },
  destroyEmployee(id) {
    const url = `http://localhost:3000/api/v1/employees/${id}`
    return User.getAccessToken()
    .then((headers) => {
      Delete(url, headers);
      return null;
    })
    //.then(User.deleteAccessToken)
  },

}

export default Api;
// export { Api }; Quand y aura plusieurs éléments
