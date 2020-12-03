import GoogleMapReact from "google-map-react";
import axios from "axios";

import React, { Component } from "react";

const Marker = () => {
  return (
    <div>
      <img
        src='/images/marker.png'
        style={{
          height: "40px",
          width: "40px",
        }}
        alt='Marker'
      />
    </div>
  );
};

class GoogleMap extends Component {
  state = {
    center: this.props.center,
    zoom: this.props.zoom,
    GoogleMapsAPIKey: "",
    UserAuthorzationBearerToken: this.props.UserAuthorzationBearerToken,
    error: "",
  };

  getGoogleMapsAPIKey = function (UserAuthorzationBearerToken) {
    axios({
      method: "post",
      url: "/api/getGoogleMapsAPIKey",
      headers: {
        "Content-Type": "application/json",
        Authorization: UserAuthorzationBearerToken,
      },
    })
      .then((res) => {
        this.setState({
          GoogleMapsAPIKey: res.data.getGoogleMapsAPIKey,
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  RenderGoogleMaps = function () {
    return (
      <div style={{ height: "40vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.state.GoogleMapsAPIKey }}
          defaultCenter={{ lat: 43.6579869, lng: -79.3785519 }}
          center={this.state.center}
          defaultZoom={13}
          zoom={this.state.zoom}
        >
          <Marker
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text='My Marker'
          />
        </GoogleMapReact>
      </div>
    );
  };

  componentDidMount() {
    if (this.state.UserAuthorzationBearerToken) {
      this.getGoogleMapsAPIKey(this.state.UserAuthorzationBearerToken);
    }
  }

  render() {
    return <>{this.state.GoogleMapsAPIKey ? this.RenderGoogleMaps() : null}</>;
  }
}

export default GoogleMap;
