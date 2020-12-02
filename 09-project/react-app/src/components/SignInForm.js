import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

class SignInForm extends Component {
  state = {
    Email: "sohrab.soltani@gmail.com",
    Password: "zoTRSgo47iYqSKGzd9",
    Disabled: false,
    error: "",
  };

  handlechange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const Disabled = this.state.Disabled;
    if (Disabled) {
      return;
    }
    this.setState(
      {
        Disabled: true,
      },
      function () {
        axios({
          method: "post",
          url: "/api/signin",
          data: {
            Email: this.state.Email,
            Password: this.state.Password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            this.setState(
              {
                error: "",
              },
              () => {
                this.props.SignInAction(res.data);
              }
            );
          })
          .catch((err) => {
            this.setState({
              error: err.response.data.error,
              Disabled: false,
            });
          });
      }
    );
  };

  render() {
    return (
      <div className='container container-fluid'>
        <div className='row justify-content-lg-center'>
          <div className='col-lg-12' style={{ textAlign: "center" }}>
            <h4>
              Please sign in or sign up to use the IP Geolocation service.
            </h4>
            <p>{}</p>
          </div>
        </div>
        <div className='row justify-content-lg-center'>
          <div className='col-lg-4'>
            <div className='app-content'>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group' style={{ textAlign: "left" }}>
                  <label htmlFor='Email' disabled={this.state.Disabled}>
                    Email address
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='Email'
                    name='Email'
                    value={this.state.Email}
                    required={true}
                    onChange={this.handlechange}
                    disabled={this.state.Disabled}
                  />
                </div>
                <div className='form-group' style={{ textAlign: "left" }}>
                  <label htmlFor='Password' disabled={this.state.Disabled}>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='Password'
                    name='Password'
                    value={this.state.Password}
                    required={true}
                    onChange={this.handlechange}
                    disabled={this.state.Disabled}
                  />
                </div>
                <div
                  className={`${
                    this.state.error.length
                      ? "alert alert-danger visible"
                      : "invisible"
                  }`}
                  role='alert'
                >
                  {this.state.error}
                </div>
                <div className='form-group' style={{ textAlign: "center" }}>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    style={{ margin: "5px" }}
                    disabled={this.state.Disabled}
                  >
                    Sign In
                  </button>
                  <Link to='/signup'>
                    <button
                      type='button'
                      className='btn btn-success'
                      style={{ margin: "5px" }}
                      disabled={this.state.Disabled}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInForm;
