import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegistrationPage from "./components/registration/RegistrationPage";
import AuthenticationPage from "./components/authentication/AuthenticationPage";
import Timeline from "./components/timeline/Timeline";
import ProfilePage from "./components/profile/ProfilePage";
import { createBrowserHistory } from "history";
import "./App.css";
import Layout from "./components/hoc/Layout/Layout";

class App extends Component {
  constructor(props) {
    super(props);

    const authenticationContext = localStorage.getItem("authenticationContext");
    if (authenticationContext !== null) {
      this.state = { authenticationContext: JSON.parse(authenticationContext) };
      console.log(authenticationContext);
    } else this.state = {};
  }

  onAuthentication = authenticationContext => {
    const text = JSON.stringify(authenticationContext);
    localStorage.setItem("authenticationContext", text);
    this.setState({ authenticationContext });
  };

  onLogout = () => {
    localStorage.removeItem("authenticationContext");
    this.setState({ authenticationContext: null });
    createBrowserHistory.apply().push("/authentication");
  };

  onRegistration = user => { };

  render() {
    return (
      <Router>
        <>
          <Route
            path="/profile/:user?"
            component={router => (
              <ProfilePage app={this.state} router={router} />
            )}
          />
          <Route
            path="/registration"
            component={router => (
              <RegistrationPage
                app={this.state}
                router={router}
                onRegistration={this.onRegistration}
              />
            )}

          />
          <Route
            path="/authentication"
            component={router => (
              <AuthenticationPage
                app={this.state}
                router={router}
                onAuthentication={this.onAuthentication}
              />
            )}
          />
          <Route
            path="/timeline"
            component={router => <Timeline app={this.state} router={router} />}
          />
        </>
      </Router>
    );
  }
}

export default App;
