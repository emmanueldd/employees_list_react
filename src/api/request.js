import ApiUtils from './apiUtils'
import User from '../models/User'

function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  })
}

/**
*/
const request = function(method, url, header, body) {
   console.log("Request." + method + ": " + url)
   console.log("Body: ")
   console.log(body)
   console.log("Headers: ")
   console.log(header)
  return timeoutPromise(20000, fetch(url, {
    method: method,
    headers: header,
    body: body
  }))
  .then(ApiUtils.checkStatus)
}

/**
*/
const get = function(url, header) {
  return request("GET", url, header)
    //.then((response) => User.saveAccessToken(response, url))
    .then((response) => response.json())
    .then((responseJson) => {
       console.log("Api.GET.responseJson: ")
       console.log(responseJson)
      return responseJson;
    })
}

/**
*/
const post = function(url, header, body) {
  return request("POST", url, header, body)
  //.then((response) => User.saveAccessToken(response, url))
  .then((response) => response.json())
  .then((responseJson) => {
     console.log("Api.POST.responseJson: ")
     console.log(responseJson)
    return responseJson;
  })
}

/**
*/
const put = function(url, header, body) {
  return request("PUT", url, header, body)
  //.then((response) => User.saveAccessToken(response, url))
  .then((response) => response.json())
  .then((responseJson) => {
     console.log("Api.PUT.responseJson: ")
     console.log(responseJson)
    return responseJson;
  })
}

const del = function(url, header) {
  return request("DELETE", url, header)
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson;
  })
}

module.exports = {
  Post: post,
  Put: put,
  Get: get,
  Delete: del,
  Request: request
}
