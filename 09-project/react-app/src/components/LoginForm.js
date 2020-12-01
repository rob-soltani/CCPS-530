import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class LoginForm extends Component {
  state = {
    name: "Sohrab",
    age: 33,
    formReadonly: false,
  };

  disableForm = (e) => {
    this.setState({
      formReadonly: true,
    });
    console.log(2);
  };

  handleSubmit = (e) => {
    e.preventDefault();
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
              <form
                readOnly={this.state.formReadonly}
                onSubmit={this.handleSubmit}
              >
                <div className='form-group' style={{ textAlign: "left" }}>
                  <label htmlFor='Email'>Email address</label>
                  <input
                    type='email'
                    className='form-control'
                    id='Email'
                    name='Email'
                    aria-describedby='emailHelp'
                    required={true}
                  />
                </div>
                <div className='form-group' style={{ textAlign: "left" }}>
                  <label htmlFor='Password'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    id='Password'
                    name='Password'
                    required={true}
                  />
                </div>
                <div className='form-group' style={{ textAlign: "center" }}>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    style={{ margin: "5px" }}
                  >
                    Sign In
                  </button>
                  <button
                    type='button'
                    className='btn btn-success'
                    style={{ margin: "5px" }}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
