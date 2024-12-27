/* eslint-disable no-unused-vars */
import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Select = forwardRef(function Select(
  { options, label, className = '', placeholder = 'Select an option', error, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1 text-gray-700">
          {label}
        </label>
      )}
      
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border ${error ? 'border-red-500' : 'border-gray-200'} w-full ${className}`}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options?.length > 0 ? (
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default Select;
