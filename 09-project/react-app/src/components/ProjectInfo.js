import React, { Component } from "react";

class ProjectInfo extends Component {
  render() {
    return (
      <>
        <div id='LabInfo' className='row'>
          <div className='col-lg-12'>
            <div id='lab-into-area'>
              <h5 className='font-weight-bold'>
                <a href='https://rob.soltani.io'>Rob (Sohrab) Soltani</a>
              </h5>
              <h4 className='font-weight-bold'>Project - IP Geolocation</h4>
              <a rel="noreferrer" href='https://github.com/rob-soltani/CCPS-530' target='_blank'>
                <img
                  src='/images/GitHub-BW-80x80.png'
                  style={{ width: "50px", height: "50px" }}
                  alt='GitHub Logo'
                />
              </a>
            </div>
            <hr />
          </div>
        </div>
      </>
    );
  }
}

export default ProjectInfo;
