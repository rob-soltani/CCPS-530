import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";


class SignInForm extends Component {
  state = {
    Email: "sohrab.soltani@gmail.com",
    Password: "zoTRSgo47iYqSKGzd9",
    Disabled: false,
    error: "",
    GoogleReCaptchaSiteKey: "",
    CaptchaValue: "",
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

    if (!this.state.Email.length) {
      this.setState({
        error: "Please enter your email.",
        Disabled: false,
      });
      return;
    }

    if (!this.state.Password.length) {
      this.setState({
        error: "Please enter your password.",
        Disabled: false,
      });
      return;
    }

    if (!this.state.CaptchaValue.length) {
      this.setState({
        error: "Please solve the captcha.",
        Disabled: false,
      });
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
            ReCaptchaValue: this.state.CaptchaValue,
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

  ReCAPTCHA_Change = (value) => {
    this.setState({
      CaptchaValue: value,
    });
  };

  componentDidMount() {
    axios({
      method: "post",
      url: "/api/getGoogleReCaptchaSiteKey",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        this.setState({
          GoogleReCaptchaSiteKey: res.data.GoogleReCaptchaSiteKey,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Failed to fetch ReCaptcha Site Key",
          Disabled: true,
        });
      });
  }

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
          <div className='col-lg-5' style={{ minWidth: "310px" }}>
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
                  className='form-group'
                  style={{
                    textAlign: "center",
                    maxWidth: "304px",
                    margin: "auto",
                    padding: "5px",
                  }}
                >
                  {this.state.GoogleReCaptchaSiteKey ? (
                    this.state.GoogleReCaptchaSiteKey.length ? (
                      <ReCAPTCHA
                        sitekey={this.state.GoogleReCaptchaSiteKey}
                        onChange={this.ReCAPTCHA_Change}
                      />
                    ) : null
                  ) : null}
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
