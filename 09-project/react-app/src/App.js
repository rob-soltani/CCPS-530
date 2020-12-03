import "./App.css";
import React, { Component } from "react";
import BackToCCPS530 from "./components/BackToCCPS530";
import ProjectInfo from "./components/ProjectInfo";
import SignInForm from "./components/SignInForm";
import CourseInfo from "./components/CourseInfo";
import UniversityInfo from "./components/UniversityInfo";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/SignUpForm";
import SignOut from "./components/SignOut";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    UserAuthorzationBearerToken: null,
    UserFirstName: "",
    UserLastName: "",
    UserEmail: "",
    UserID: "",
  };

  SignInAction = (UserData) => {
    this.setState({
      UserAuthorzationBearerToken: "Bearer " + UserData.Token,
      UserFirstName: UserData.FirstName,
      UserLastName: UserData.LastName,
      UserEmail: UserData.Email,
    });
  };

  SignOutAction = () => {
    this.setState({
      UserAuthorzationBearerToken: null,
    });
  };

  SignUpAction = (UserData) => {
    this.setState({
      UserAuthorzationBearerToken: "Bearer " + UserData.Token,
      UserFirstName: UserData.FirstName,
      UserLastName: UserData.LastName,
      UserEmail: UserData.Email,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <BackToCCPS530 />
          <div className='container container-fluid'>
            <ProjectInfo name='Project - IP Geolocation' />

            <Switch>
              <Route exact path='/'>
                {this.state.UserAuthorzationBearerToken === null ? (
                  <Redirect to='/signin' />
                ) : null}
              </Route>

              <Route exact path='/signin'>
                {this.state.UserAuthorzationBearerToken === null ? (
                  <SignInForm SignInAction={this.SignInAction} />
                ) : null}
              </Route>

              <Route exact path='/signout'>
                {<SignOut SignOutAction={this.SignOutAction} />}
              </Route>

              <Route exact path='/signup'>
                <SignUpForm SignUpAction={this.SignUpAction} />
              </Route>

              <Route exact path='/dashboard'>
                <Dashboard
                  UserFirstName={this.state.UserFirstName}
                  UserAuthorzationBearerToken={
                    this.state.UserAuthorzationBearerToken
                  }
                />
              </Route>
            </Switch>

            <Route>
              {this.state.UserAuthorzationBearerToken === null ? (
                <Redirect to='/signin' />
              ) : (
                <Redirect to='/dashboard' />
              )}
            </Route>

            <CourseInfo />
            <UniversityInfo />
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
