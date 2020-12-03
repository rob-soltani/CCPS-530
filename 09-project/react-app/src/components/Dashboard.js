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
      Timezone: "-",
    },
    center: {
      lat: 43.6579869,
      lng: -79.3785519,
    },
  };

  DisplayMap = (MapData) => {
    this.setState(
      {
        IP: null,
      },
      function () {
        if (MapData === false) {
          return;
        }
        this.setState({
          center: {
            lat: MapData.latitude,
            lng: MapData.longitude,
          },
          IP: MapData.ip_address,
          IPFindOutput: {
            Longitude: MapData.longitude || this.state.IPFindOutput.Longitude,
            Latitude: MapData.latitude || this.state.IPFindOutput.Latitude,
            Continent: MapData.continent || this.state.IPFindOutput.Continent,
            ContinentCode:
              MapData.continent_code || this.state.IPFindOutput.ContinentCode,
            Country: MapData.country || this.state.IPFindOutput.Country,
            CountryCode:
              MapData.country_code || this.state.IPFindOutput.CountryCode,
            Region: MapData.region || this.state.IPFindOutput.Region,
            RegionCode:
              MapData.region_code || this.state.IPFindOutput.RegionCode,
            County: MapData.county || this.state.IPFindOutput.County,
            City: MapData.city || this.state.IPFindOutput.City,
            PostalCode:
              MapData.postal_code || this.state.IPFindOutput.PostalCode,
            Currency: MapData.currency || this.state.IPFindOutput.Currency,
            Languages: MapData.languages || this.state.IPFindOutput.Languages,
            Timezone: MapData.timezone || this.state.IPFindOutput.Timezone,
          },
        });
      }
    );
  };

  ClearIP = () => {
    this.setState({
      IP: null,
    });
  };

  render() {
    return (
      <div className='container container-fluid'>
        <div className='row justify-content-lg-center'>
          <div className='col-lg-12'>
            <h4>Welcome {this.props.UserFirstName}!</h4>
            <br />
            <SearchBox
              UserAuthorzationBearerToken={
                this.props.UserAuthorzationBearerToken
              }
              DisplayMap={this.DisplayMap}
              ClearIP={this.ClearIP}
            />
            <br />
            {this.state.IP ? (
              this.state.IP.length ? (
                <GoogleMap
                  UserAuthorzationBearerToken={
                    this.props.UserAuthorzationBearerToken
                  }
                  center={this.state.center}
                  zoom={11}
                />
              ) : null
            ) : null}

            <br />
            {this.state.IP ? (
              this.state.IP.length ? (
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
                  Timezone={this.state.IPFindOutput.Timezone}
                />
              ) : null
            ) : null}

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
