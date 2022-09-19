import React from 'react';
import PropTypes from 'prop-types';
import InputStyled from './input.styled';
export default function Input({ onChange, value }) {
  return (
    <InputStyled
      value={value}
      onChange={onChange}
      type="text"
      autocomplete="off"
      autoFocus
      required
      placeholder="Search images and photos"
    />
  );
}
Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
