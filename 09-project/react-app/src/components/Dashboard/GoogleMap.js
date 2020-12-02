import GoogleMapReact from "google-map-react";

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

export default function GoogleMap({ center, zoom, GoogleMapsAPIKey }) {
  const defaultProps = {
    center: {
      lat: 43.6579869,
      lng: -79.3785519,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GoogleMapsAPIKey }}
        defaultCenter={defaultProps.center}
        center={center}
        defaultZoom={defaultProps.zoom}
        zoom={zoom}
      >
        <Marker
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text='My Marker'
        />
      </GoogleMapReact>
    </div>
  );
}
