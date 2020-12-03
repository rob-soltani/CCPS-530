import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const validate = require("ip-validator");

class SearchBox extends Component {
  state = {
    UserAuthorzationBearerToken: this.props.UserAuthorzationBearerToken,
    IPAddress: "",
    Disabled: false,
    error: "",
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
        const IPAddress = this.state.IPAddress;
        if (!/^\d+$/.test(IPAddress.replace(/\./g, ""))) {
          this.setState({
            error: "Invalid IP Address.",
            Disabled: false,
          });
          return;
        }

        if (!validate.ipv4(IPAddress)) {
          this.setState({
            error: "Invalid IP Address.",
            Disabled: false,
          });
          return;
        }

        this.setState(
          {
            error: "",
          },
          function () {
            axios({
              method: "post",
              url: "/api/getLocationByIP",
              data: {
                IPAddress: this.state.IPAddress,
              },
              headers: {
                Authorization: this.state.UserAuthorzationBearerToken,
              },
            })
              .then((res) => {
                this.setState(
                  {
                    error: "",
                    Disabled: false,
                  },
                  () => {
                    this.props.DisplayMap(res.data);
                  }
                );
              })
              .catch((err) => {
                if (err.response.data.AuthError) {
                  this.setState({
                    error: err.response.data.AuthError,
                    Disabled: false,
                  });
                } else {
                  this.setState({
                    error: err.response.data.error,
                    Disabled: false,
                  });
                }
              });
          }
        );
      }
    );
  };

  handlechange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    this.props.DisplayMap(false);
  };

  handleUseYourIP = (e) => {
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
        this.setState(
          {
            error: "",
          },
          function () {
            axios({
              method: "post",
              url: "/api/getMyIP",
              headers: {
                Authorization: this.state.UserAuthorzationBearerToken,
              },
            })
              .then((res) => {
                this.setState({
                  error: "",
                  Disabled: false,
                  IPAddress: res.data.IPAddress || "141.117.126.20",
                });
              })
              .catch((err) => {
                if (err.response.data.AuthError) {
                  this.setState({
                    error: err.response.data.AuthError,
                    Disabled: false,
                  });
                } else {
                  this.setState({
                    error: err.response.data.error,
                    Disabled: false,
                  });
                }
              });
          }
        );
      }
    );
  };

  handleClear = (e) => {
    e.preventDefault();

    this.setState({
      IPAddress: "",
    }, function () {
      this.props.ClearIP();
    });
  };

  render() {
    return (
      <div>
        <form
          className='form-inline justify-content-center'
          onSubmit={this.handleSubmit}
        >
          <input
            type='text'
            className='form-control mb-2 mr-sm-2'
            id='IPAddress'
            name='IPAddress'
            placeholder='e.g. 141.117.126.20'
            onChange={this.handlechange}
            required
            disabled={this.state.Disabled}
            style={{ margin: "2px" }}
            value={this.state.IPAddress}
          />
          <button
            type='submit'
            className='btn btn-success mb-2'
            disabled={this.state.Disabled}
            style={{ margin: "2px" }}
          >
            Look Up IP Location
          </button>
           <button
            type='button'
            className='btn btn-primary mb-2'
            disabled={this.state.Disabled}
            style={{ margin: "2px" }}
            onClick={this.handleUseYourIP}
          >
            User Your IP
          </button> 
          <button
            type='button'
            className='btn btn-danger mb-2'
            disabled={this.state.Disabled}
            style={{ margin: "2px" }}
            onClick={this.handleClear}
          >
            Clear
          </button>
        </form>

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
      </div>
    );
  }
}

export default SearchBox;
