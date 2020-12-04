import React, { Component } from "react";

class UniversityInfo extends Component {
  render() {
    return (
      <>
        <div id='UniversityInfo' className='row'>
          <div className='col-lg-12'>
            <hr />
            <h5 className='font-weight-bold'>
              University and Program Information
            </h5>
          </div>
          <div className='col-lg-12'>
            <div className='text-center'>
              <img
                src='/images/Ryerson-rgb.png'
                alt='Ryerson University Logo'
                style={{ width: "150px", height: "72px"}}
              />
              <br />
              <br />
              <strong>Faculty of Science</strong>
              <br />
              <strong>Computer Science Department</strong>
              <br />
              <strong>Undergraduate Program</strong>
              <br />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UniversityInfo;
