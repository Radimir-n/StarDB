import React from 'react';

import './spinner.css';

const Spinner = ({loading}) => {
  if(loading){
    return (
      <div className="lds-css">
        <div className="lds-double-ring">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return null

};

export default Spinner;
