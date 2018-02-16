
var ApiUtils = {
  checkStatus: function(response) {
    console.log("Api.status: ==>" + response.status, response)
    // console.log("headers token: ===>", response.headers.get('Access-Token'))
    // console.log("headers: ===>", response.headers)
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
};

export default ApiUtils;
