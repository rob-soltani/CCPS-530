const MapInfo = ({
  Longitude,
  Latitude,
  Continent,
  ContinentCode,
  Country,
  CountryCode,
  Region,
  RegionCode,
  County,
  City,
  PostalCode,
  Currency,
  Languages,
  Timezone,
}) => {
  const DisplayedLanguages = Languages.length ? Languages.join(", ") : "-";

  return (
    <div>
      <form style={{ textAlign: "left" }}>
        <div className='form-row'>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='Longitude'>Longitude</label>
              <input
                type='text'
                className='form-control'
                id='Longitude'
                value={Longitude}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='Latitude'>Latitude</label>
              <input
                type='text'
                className='form-control'
                id='Latitude'
                value={Latitude}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='Continent'>Continent</label>
              <input
                type='text'
                className='form-control'
                id='Continent'
                value={Continent + " (" + ContinentCode + ")"}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='Country'>Country</label>
              <input
                type='text'
                className='form-control'
                id='Country'
                value={Country + " (" + CountryCode + ")"}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='Region'>Region</label>
              <input
                type='text'
                className='form-control'
                id='Region'
                value={Region + " (" + RegionCode + ")"}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='County'>County</label>
              <input
                type='text'
                className='form-control'
                id='County'
                value={County}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='City'>City</label>
              <input
                type='text'
                className='form-control'
                id='City'
                value={City}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='PostalCode'>Postal Code</label>
              <input
                type='text'
                className='form-control'
                id='PostalCode'
                value={PostalCode}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='Currency'>Currency</label>
              <input
                type='text'
                className='form-control'
                id='Currency'
                value={Currency}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='Languages'>Languages</label>
              <input
                type='text'
                className='form-control'
                id='Languages'
                value={DisplayedLanguages}
                readOnly
              />
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='form-group'>
              <label htmlFor='Timezone'>Timezone</label>
              <input
                type='text'
                className='form-control'
                id='Timezone'
                value={Timezone}
                readOnly
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MapInfo;
