/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

function Logo({ width = '90px', className = '', logoSrc = '../DALL·E 2024-12-24 12.43.45 - A modern, sleek logo for a tech company. The design should be minimalistic and professional, featuring abstract geometric shapes, clean lines, and a f.webp' }) {
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
