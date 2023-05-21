import React from 'react';
import './css/Loading.css'; // import the styles.css file

export default (props) => {
  const { show } = props;

  return (
    <div className={`preloader bg-soft ${show ? '' : 'hide'}`}>
      <div className="preloader-inner">
        <div className={`loader ${show ? 'show' : 'hide'}`}></div>
      </div>
    </div>
  );
};
