import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

class SignUpForm extends Component {
  state = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    PaswordsMatch: false,
    Disabled: false,
    error: "",
    GoogleReCaptchaSiteKey: "",
    CaptchaValue: "",
  };

  handlechange = (e) => {
    this.setState(
      {
        [e.target.id]: e.target.value,
      },
      function () {
        if (this.state.Password === this.state.ConfirmPassword) {
          this.setState({
            PaswordsMatch: true,
          });
        } else {
          this.setState({
            PaswordsMatch: false,
          });
        }
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const Disabled = this.state.Disabled;
    if (Disabled) {
      return;
    }

    if (!this.state.FirstName.length) {
      this.setState({
        error: "Please enter your first name.",
        Disabled: false,
      });
      return;
    }

    if (!this.state.LastName.length) {
      this.setState({
        error: "Please enter your last name.",
        Disabled: false,
      });
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

    if (!this.state.Password.length) {
      this.setState({
        error: "Please confirm your password.",
        Disabled: false,
      });
      return;
    }

    if (this.state.PaswordsMatch === false) {
      this.setState({
        error: "Passwords do not match",
      });
    } else if (this.state.Password.length < 6) {
      this.setState({
        error: "Password must be at least 6 characters long.",
      });
    } else if (!this.state.CaptchaValue.length) {
      this.setState({
        error: "Please solve the captcha.",
        Disabled: false,
      });
      return;
    } else {
      this.setState(
        {
          error: "",
          Disabled: true,
        },
        function () {
          axios({
            method: "post",
            url: "/api/signup",
            data: {
              FirstName: this.state.FirstName,
              LastName: this.state.LastName,
              Email: this.state.Email,
              Password: this.state.Password,
              ConfirmPassword: this.state.ConfirmPassword,
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
                  this.props.SignUpAction(res.data);
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
    }
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
            <h4>Sign Up</h4>
            <p>{}</p>
          </div>
        </div>
        <div className='row justify-content-lg-center'>
          <div className='col-lg-5'>
            <div className='app-content'>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group' style={{ textAlign: "left" }}>
                  <label htmlFor='FirstName' disabled={this.state.Disabled}>
                    First Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='FirstName'
                    name='FirstName'
                    required={true}
                    onChange={this.handlechange}
                    disabled={this.state.Disabled}
                    autoComplete='on'
                  />
                </div>
                <div className='form-group' style={{ textAlign: "left" }}>
                  <label htmlFor='LastName' disabled={this.state.Disabled}>
                    Last Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='LastName'
                    name='LastName'
                    required={true}
                    onChange={this.handlechange}
                    disabled={this.state.Disabled}
                    autoComplete='on'
                  />
                </div>
                <div className='form-group' style={{ textAlign: "left" }}>
                  <label htmlFor='Email' disabled={this.state.Disabled}>
                    Email address
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='Email'
                    name='Email'
                    required={true}
                    onChange={this.handlechange}
                    disabled={this.state.Disabled}
                    autoComplete='on'
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
                    required={true}
                    onChange={this.handlechange}
                    disabled={this.state.Disabled}
                    autoComplete='off'
                  />
                </div>
                <div className='form-group' style={{ textAlign: "left" }}>
                  <label
                    htmlFor='ConfirmPassword'
                    disabled={this.state.Disabled}
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='ConfirmPassword'
                    name='ConfirmPassword'
                    required={true}
                    onChange={this.handlechange}
                    disabled={this.state.Disabled}
                    autoComplete='off'
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
                    this.state.error
                      ? this.state.error.length
                        ? "alert alert-danger visible"
                        : "invisible"
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
                    Sign Up
                  </button>
                  <Link to='/'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      style={{ margin: "5px" }}
                      disabled={this.state.Disabled}
                    >
                      Cancel
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

export default SignUpForm;
