import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GoogleMap from "./Dashboard/GoogleMap";
import SearchBox from "./Dashboard/SearchBox";
import MapInfo from "./Dashboard/MapInfo";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = {
    IP: "",
    IPFindOutput: {
      Longitude: "-",
      Latitude: "-",
      Continent: "-",
      ContinentCode: "-",
      Country: "-",
      CountryCode: "-",
      Region: "-",
      RegionCode: "-",
      County: "-",
      City: "-",
      PostalCode: "-",
      Currency: "-",
      Languages: ["-", "-", "-"],
    },
  };

  render() {
    return (
      <div className='container container-fluid'>
        <div className='row justify-content-lg-center'>
          <div className='col-lg-12'>
            <h4>Welcome {this.props.UserFirstName}!</h4>
            <br />
            <SearchBox UserAuthorzationBearerToken={this.props.UserAuthorzationBearerToken} />
            <br />
            <GoogleMap
              GoogleMapsAPIKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            />
            <br />
            <MapInfo
              Longitude={this.state.IPFindOutput.Longitude}
              Latitude={this.state.IPFindOutput.Latitude}
              Continent={this.state.IPFindOutput.Continent}
              ContinentCode={this.state.IPFindOutput.ContinentCode}
              Country={this.state.IPFindOutput.Country}
              CountryCode={this.state.IPFindOutput.CountryCode}
              Region={this.state.IPFindOutput.Region}
              RegionCode={this.state.IPFindOutput.RegionCode}
              County={this.state.IPFindOutput.County}
              City={this.state.IPFindOutput.City}
              PostalCode={this.state.IPFindOutput.PostalCode}
              Currency={this.state.IPFindOutput.Currency}
              Languages={this.state.IPFindOutput.Languages}
            />
            <Link to='/signout'>
              <button
                type='button'
                className='btn btn-secondary'
                style={{ margin: "5px" }}
                disabled={this.state.Disabled}
              >
                Sign Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
