import "./App.css";
import React, { Component } from "react";
import BackToCCPS530 from "./components/BackToCCPS530";
import ProjectName from "./components/ProjectName";
import SignInForm from "./components/SignInForm";
import ProjectInfo from "./components/ProjectInfo";
import CourseInfo from "./components/CourseInfo";
import UniversityInfo from "./components/UniversityInfo";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import SignUpForm from "./components/SignUpForm";
import SignOut from "./components/SignOut";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { SetUserInfo } from "./store/actionCreators/UserInfoActions";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  SignInAction = (UserInfo) => {
    this.props.SetUserInfo({
      Token: "Bearer " + UserInfo.Token,
      FirstName: UserInfo.FirstName,
      LastName: UserInfo.LastName,
      Email: UserInfo.Email,
    });
  };

  SignOutAction = () => {
    this.props.SetUserInfo({
      Token: null,
      FirstName: null,
      LastName: null,
      Email: null,
    });
  };

  SignUpAction = (UserInfo) => {
    this.props.SetUserInfo({
      Token: "Bearer " + UserInfo.Token,
      FirstName: UserInfo.FirstName,
      LastName: UserInfo.LastName,
      Email: UserInfo.Email,
    });
  };

  RedirectToMainDomain = () => {
    const CurrentURL = window.location.href;
    const MainDomain = "https://project.ccps530.ru.rob.soltani.io";
    if (CurrentURL.length < 41) {
      console.log(1);
      window.location.href = MainDomain;
      return;
    }
    const First41Letters = CurrentURL.substring(0, 41);
    if (First41Letters !== MainDomain) {
      console.log(2);
      window.location.href = MainDomain;
      return;
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <BackToCCPS530 />
          <div className='container container-fluid'>
            <ProjectName />

            {this.RedirectToMainDomain()}

            <Switch>
              <Route exact path='/'>
                {this.props.Token === null ? <Redirect to='/signin' /> : null}
              </Route>

              <Route exact path='/signin'>
                {this.props.Token === null ? (
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
                <Dashboard />
              </Route>
            </Switch>

            <Route>
              {this.props.Token === null ? (
                <Redirect to='/signin' />
              ) : (
                <Redirect to='/dashboard' />
              )}
            </Route>

            <ProjectInfo name='Project - IP Geolocation' />
            <CourseInfo />
            <UniversityInfo />
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    Token: state.UserInfo.Token,
    FirstName: state.UserInfo.FirstName,
    LastName: state.UserInfo.LastName,
    Email: state.UserInfo.Email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetUserInfo: (UserInfo) => dispatch(SetUserInfo(UserInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
