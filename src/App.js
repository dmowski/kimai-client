import React, { Component } from "react";
import "./App.css";

import Login from "./components/Login";
import Reports from "./components/Reports";

import { Provider } from "react-redux";

import store from "./store";

function logout() {
  debugger;
  // credentials.logout();
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <button
          className="logout button-color button-color-fail"
          onClick={logout}
        >
          Logout
        </button>
        <Reports />
        <Login />
      </Provider>
    );
    /*
    
    
    <!--div className="App">
      <Postform />
      <Posts />
    </div>
    */
  }
}

export default App;
