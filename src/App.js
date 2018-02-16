import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import User from './models/User.js';
import Router from './Router'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {
  state = { loggedIn: null }
  componentWillMount() {
    // Si le asyncstorage a changé (connexion, etc)
    User.getCurrent().then((user) => {
      console.log('GetCurrentUser =>', user);
      if (user) {
        this.setState({loggedIn: true});
      }
      else {
        this.setState({loggedIn: false});
      }
    })
  }
  render() {


    return(
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App;
