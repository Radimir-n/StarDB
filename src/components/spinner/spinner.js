import React from 'react';

import './spinner.css';

const Spinner = ({loading}) => {
  if(loading){
    let spinner = <div key = 'loader' className="lds-css">
        <div className="lds-double-ring">
          <div></div>
          <div></div>
        </div>
      </div>
    return spinner
  }
  return null
};

export default Spinner;
