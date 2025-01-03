/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types';

function Container({children}) {
  return <div className='w-full max-w-full mx-auto px-8'>{children}</div>;
  
}
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container