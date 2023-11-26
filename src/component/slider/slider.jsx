import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import "./slider.styles.scss";

const Slider = ({step, minValue, maxValue, prefix, suffix}) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const prefixRef = useRef(null);
  const suffixRef = useRef(null);
  const [prefixWidth, setPrefixWidth] = useState({
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  });

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
  
  const [valueC, setValueC] = useState({ min: minValue, max: maxValue });
  const [minValueC, setMinValueC] = React.useState(valueC ? valueC.min : min);
  const [maxValueC, setMaxValueC] = React.useState(valueC ? valueC.max : max);

  React.useEffect(() => {
    if (valueC) {
      setMinValueC(valueC.min);
      setMaxValueC(valueC.max);
    }
  }, [valueC]);

  const handleMinChange = e => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValueC - step);
    if (!valueC) setMinValueC(newMinVal);
    setValueC({ min: newMinVal, max: maxValueC });
  };

  const handleMaxChange = e => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValueC + step);
    if (!valueC) setMaxValueC(newMaxVal);
    setValueC({ min: minValueC, max: newMaxVal });
  };

  useEffect(() => {
    setMin(minValue);
    setMax(maxValue);
  }, [minValue, maxValue]);

  useEffect(() => {
    setPrefixWidth(prev => ({
      paddingLeft: prefix ? `${prefixRef?.current.offsetWidth}px` : prev.paddingLeft,
      paddingRight: suffix ? `${suffixRef?.current.offsetWidth}px` : prev.paddingRight,
    }));
  }, []);

  return (
    <div>
      <div className="slider__groups">
        <div className="slider__group">
          {prefix && (
            <div ref={prefixRef} className="slider__text slider__text_prefix">{prefix}</div>
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
            style={{...prefixWidth}}
          />
          {suffix && (
            <div ref={suffixRef} className="slider__text slider__text_suffix">{suffix}</div>
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
            className="form__control slider__form-control"
            onChange={handleChange}
            onBlur={handleBlur}
            style={{...prefixWidth}}
          />
          {suffix && (
            <div className="slider__text slider__text_suffix">{suffix}</div>
          )}
        </div>
      </div>
      <div className="slider__range">
        <div className="slider__range-group">
          <input
            type="range"
            className="form__range form__range_min"
            min={minValue}
            max={maxValue}
            value={valueC.min}
            step={step}
            onChange={handleMinChange}
          />
          <input
            type="range"
            className="form__range form__range_max"
            min={minValue}
            max={maxValue}
            value={valueC.max}
            step={step}
            onChange={handleMaxChange}
          />
        </div>
        <div className="slider__range-text">
          <div className="slider__range-min">{prefix}{minValue}</div>
          <div className="slider__range-max">{prefix}{maxValue}</div>
        </div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  step: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

Slider.defaultProps = {
  step: 1,
  minValue: 0,
  maxValue: 9999,
  prefix: '',
  suffix: '',
};

export default Slider;
