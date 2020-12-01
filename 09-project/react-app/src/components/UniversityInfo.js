import React, { Component } from "react";

class UniversityInfo extends Component {
  render() {
    return (
      <>
        <div id='UniversityInfo' className='row'>
          <div className='col-lg-12'>
            <hr />
            <h3 className='font-weight-bold'>
              University and Program Information
            </h3>
          </div>
          <div className='col-lg-12'>
            <div className='text-center'>
              <img
                src='/images/Ryerson-rgb.png'
                alt='Ryerson University Logo'
              />
              <h4 className='font-weight-bold'>
                <br />
                Faculty of Science
                <br />
                Computer Science Department
                <br />
                Undergraduate Program
                <br />
              </h4>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UniversityInfo;
