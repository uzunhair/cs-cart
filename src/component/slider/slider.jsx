import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import "./slider.styles.scss";

const Slider = ({minValue, maxValue, prefix, suffix}) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const handleChange = ((event) => {
    const name = event.target.name;
    const valueAsNumber = event.target.valueAsNumber;
    const value = Number.isInteger(valueAsNumber) ? valueAsNumber : '';

    if (name === 'min') {
      setMin(value);
    }

    if (name === 'max') {
      setMax(value);
    }
  });

  const numberRangeMinAndMax = (num, min, max) => {
    if (num <= min) {
      return minValue;
    }

    if (num >= max) {
      return maxValue;
    }

    return num;
  };

  const handleBlur = ((event) => {
    const name = event.target.name;
    const valueAsNumber = event.target.valueAsNumber;
    const value = Number.isInteger(valueAsNumber) ? valueAsNumber : '';
    const validNumber = numberRangeMinAndMax(value, minValue, maxValue);

    if (name === 'min') {
      setMin(validNumber);
      setMax((prev) => validNumber > prev ? validNumber : prev);
    }

    if (name === 'max') {
      setMax(validNumber);
      setMin((prev) => validNumber < prev ? validNumber : prev);
    }
  });

  useEffect(() => {
    setMin(minValue);
    setMax(maxValue);
  }, [minValue, maxValue]);

  return (
    <div className="slider__groups">
      <div className="slider__group">
        {prefix && (
          <div className="slider__text slider__text_prefix">{prefix}</div>
        )}
        <input
          type="number"
          name="min"
          min={minValue}
          max={maxValue}
          value={min}
          className="form__control"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {suffix && (
          <div className="slider__text slider__text_suffix">{suffix}</div>
        )}
      </div>
      <div className="slider__divider">-</div>
      <div className="slider__group">
        {prefix && (
          <div className="slider__text slider__text_prefix">{prefix}</div>
        )}
        <input
          type="number"
          name="max"
          min={minValue}
          max={maxValue}
          value={max}
          className="form__control"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {suffix && (
          <div className="slider__text slider__text_suffix">{suffix}</div>
        )}
      </div>
    </div>
  );
};

Slider.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

Slider.defaultProps = {
  minValue: 0,
  maxValue: 9999,
  prefix: '',
  suffix: '',
};

export default Slider;
