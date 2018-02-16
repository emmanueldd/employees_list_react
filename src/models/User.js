import { AsyncStorage } from 'react-native';


var User = {

  saveAccessToken: function(response) {
    const accessToken = response.headers.get('Access-Token')
    const client = response.headers.get('Client')
    console.log("User.save.Access-Token: " + accessToken)
    console.log("User.save.Client: " + client)
    // if(url) { console.log("Call url " + url) }

    if (accessToken == null || client == null) {
      throw 'error';
      return;
    }
    // Si ERREUR !

    return AsyncStorage.setItem('@UserStore:access_token', response.headers.get('Access-Token'))
    .then(() => AsyncStorage.setItem('@UserStore:client', response.headers.get('Client')))
    .then(() => response )
  },

    // didAnswerPersonalInfo: function() {
    //   return AsyncStorage.setItem('@UserStore:ask_perso_info', "true")
    // },
    //
    // hasAnswerPersonalInfo: function() {
    //   return AsyncStorage.getItem('@UserStore:ask_perso_info')
    // },
    //
    // savePushToken: function(token) {
    //   return AsyncStorage.setItem('@UserStore:push_token', token)
    // },
    //
    // getPushToken: function(token) {
    //   return AsyncStorage.getItem('@UserStore:push_token')
    // },
    //
    //
    //
    getAccessToken: function() {
      var headers = {}
      return AsyncStorage.getItem('@UserStore:access_token')
      .then((value) => {
        headers.token = value
        return AsyncStorage.getItem('@UserStore:client')
      })
      .then((value) => {
        headers.client = value
        return User.getCurrent()
      })
      .then((value) => {
        // console.log(value)
        return {
          'Access-Token': headers.token,
          'Client': headers.client,
          'uid': value == null ? "" : value.email
        }
      })

    },
    //
    // deleteAccessToken: function() {
    //   return AsyncStorage.removeItem('@UserStore:access_token')
    //   .then(() => AsyncStorage.removeItem('@UserStore:client'))
    // },
    //
    create: function(json) {
      // console.log("User.AsyncStorage.setcurrent: ")
       return AsyncStorage.setItem('@UserStore:current', JSON.stringify(json))
    },
    //
		getCurrent: function() {
			return AsyncStorage.getItem('@UserStore:current')
			.then((value) => {
				if (value != null) { return JSON.parse(value) }
				else { return value }
			 })
		},
    //
    delete: function() {
      return AsyncStorage.setItem('@UserStore:current', '')
    },
    //
		// getStripeCustomer: function() {
		// 	return AsyncStorage.getItem('@UserStore:stripe_cus')
		// 	.then((value) => {
		// 		if (value != null) { return JSON.parse(value) }
		// 		else { return value }
		// 	 })
		// },
    //
		// getStripeCard: function() {
		// 	return AsyncStorage.getItem('@UserStore:stripe_card')
		// 	.then((value) => {
		// 		if (value != null) { return JSON.parse(value) }
		// 		else { return value }
		// 	 })
		// },
    //
		// getStripeCVV: function() {
		// 	return AsyncStorage.getItem('@UserStore:stripe_cvv')
		// },
    //
		// setStripeCVV: function(cvv) {
    //   if (cvv == null) {
    //     let error = new Error("set_stripe_cvv_null");
    //     throw error;
    //   }
		// 	return AsyncStorage.setItem('@UserStore:stripe_cvv', cvv)
		// },
    //
		// setStripeCustomer: function(customer) {
    //   if (customer == null) {
    //     let error = new Error("set_stripe_customer_null");
    //     throw error;
    //   }
		// 	return AsyncStorage.setItem('@UserStore:stripe_cus', JSON.stringify(customer))
		// },
    //
		// setStripeCard: function(token) {
    //   if (token == null) {
    //     let error = new Error("set_stripe_card_null");
    //     throw error;
    //   }
		// 	return AsyncStorage.setItem('@UserStore:stripe_card', JSON.stringify(token))
		// },
    //
    // deleteCardRegister: function () {
    //   return AsyncStorage.removeItem('@UserStore:stripe_card')
    //   .then(() => AsyncStorage.removeItem('@UserStore:stripe_cvv'))
    // },
    //
    // saveGiftCard: function(code) {
    //   return AsyncStorage.setItem('@UserStore:gift_card', JSON.stringify(code))
    // },
    //
    // getGiftCard: function() {
    //   return AsyncStorage.getItem('@UserStore:gift_card')
    // },
    //
    // deleteGiftCard: function() {
    //   return AsyncStorage.removeItem('@UserStore:gift_card')
    // },

}

export default User;
