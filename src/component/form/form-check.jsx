import React from 'react';
import PropTypes from 'prop-types';

import 'src/component/form/form.scss';

const FormCheck = ({ type, label, id }) => {
  return (
    <div className="form__check">
      <input type={type} className="form__check-input" id={id} name={id} />
      <label htmlFor={id} className="form__check-label">{label}</label>
    </div>
  );
};

FormCheck.propTypes = {
  type: PropTypes.oneOf(['radio', 'checkbox']),
  label: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

FormCheck.defaultProps = {
  type: 'checkbox'
};

export default FormCheck;
