/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import logo from './modern.jpg';  // Updated path
function Logo({ width = '90px', className = '', logoSrc = logo }) {  // Updated path
  return (
    <div
      style={{ width }}
      className={`flex items-center justify-center font-bold text-xl text-gray-800 rounded-lg ${className}`}
      aria-label="Logo"
    >
      {logoSrc ? (
        <img src={logoSrc} alt="Logo" style={{ width: '80%' }} />
      ) : (
        'Logo'
      )}
    </div>
  );
}

Logo.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
  logoSrc: PropTypes.string,
};

export default Logo;
