import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <>
        <div id='footer' className='row'>
          <div className='col-lg-12'>
            <hr />
            <div id='footer-area'>
              App last updated on December 2<sup>nd</sup>, 2020, by Rob Soltani
            </div>
          </div>
        </div>        
      </>
    );
  }
}

export default Footer;
