import React, { Component } from "react";

class CourseInfo extends Component {
  render() {
    return (
      <>
        <div id='CourseInfo' className='row'>
          <div className='col-lg-12'>
            <hr />
            <h3 className='font-weight-bold'>Course Information</h3>
          </div>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h4 className='font-weight-bold'>
                CCPS 530 - Web Systems Development - Fall 2020
                <br />
                Instructor:&nbsp;
                <a
                  rel='noreferrer'
                  href='https://ghassem.com'
                  target='_blank'
                  className='Instructor'
                >
                  <span>G</span>hassem<span> T</span>ofighi
                </a>
              </h4>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CourseInfo;
