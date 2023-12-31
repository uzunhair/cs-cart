import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import "./slider.styles.scss";

const Slider = ({step, minValue, maxValue, prefix, suffix, getFiltersForServer}) => {
  const [valueRange, setValueRange] = useState({ min: minValue, max: maxValue });
  const [minValueRange, setMinValueRange] = useState(minValue);
  const [maxValueRange, setMaxValueRange] = useState(maxValue);

  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);

  const prefixRef = useRef(null);
  const suffixRef = useRef(null);
  const [prefixWidth, setPrefixWidth] = useState({
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  });

  const [clear, setClear] = useState(false);

  const handleChange = ((event) => {
    const name = event.target.name;
    const valueAsNumber = event.target.valueAsNumber;
    const value = Number.isInteger(valueAsNumber) ? valueAsNumber : '';

    if (name === 'min') {
      setMin(value);

      if(value >= minValue && value <= maxValue) {
        const newMinVal = Math.min(value, maxValueRange - step);
        setMin(value);
        setMinValueRange(newMinVal);
        setValueRange(prev => ({...prev, min: value}));
      }
    }

    if (name === 'max') {
      setMax(value);
      if(value >= minValue && value <= maxValue) {
        const newMaxVal = Math.max(value, minValueRange + step);
        setMax(value);
        setMaxValueRange(newMaxVal);
        setValueRange(prev => ({...prev, max: newMaxVal}));
      }
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
      const newMinVal = Math.min(validNumber, maxValue - 1);
      const newMaxVal = Math.min(validNumber + 1, maxValue);
      setMin(newMinVal);
      if(newMaxVal > maxValueRange) {
        setMax(newMaxVal);
      }
    }

    if (name === 'max') {
      const newMinVal = Math.max(validNumber - 1, minValue);
      const newMaxVal = Math.max(validNumber, minValue + 1);
      setMax(newMaxVal);
      if(newMinVal < minValueRange) {
        setMin(newMinVal);
      }
    }
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { target: { value }} = event;
    const newMinVal = Math.min(value, maxValueRange - step);
    const newMaxVal = Math.max(value, minValueRange + step);
    if (event.target.id === 'range-min') {
      setMin(newMinVal);
      setMinValueRange(newMinVal);
      setValueRange({ min: newMinVal, max: maxValueRange });
    } else {
      setMax(newMaxVal);
      setMaxValueRange(newMaxVal);
      setValueRange({ min: minValueRange, max: newMaxVal });
    }
  };

  const handleClear = () => {
    setClear(prev => !prev);
  }

  useEffect(() => {
    setValueRange({ min: minValue, max: maxValue });
    setMinValueRange(minValue);
    setMaxValueRange(maxValue);

    setMin(minValue);
    setMax(maxValue);
  }, [clear, minValue, maxValue]);

  useEffect(() => {
    if (valueRange) {
      setMinValueRange(valueRange.min);
      setMaxValueRange(valueRange.max);
    }
  }, [valueRange]);

  useEffect(() => {
    setPrefixWidth(prev => ({
      paddingLeft: prefix ? `${prefixRef?.current.offsetWidth}px` : prev.paddingLeft,
      paddingRight: suffix ? `${suffixRef?.current.offsetWidth}px` : prev.paddingRight,
    }));
  }, [prefix, suffix]);

  useEffect(() => {
    getFiltersForServer()({
      "slider_min_value": min,
      "slider_max_value": max,
    });
  }, [minValueRange, maxValueRange, min, max]);

  const minPos = (minValueRange - minValue) / ((maxValue - minValue) * 0.01);
  const maxPos = (maxValue - maxValueRange) / (maxValue * 0.01);

  return (
    <div>
      {(minPos > 0 || maxPos > 0) && (
        <button type="button" onClick={handleClear} className="filter__clear-button">Очистить</button>
      )}
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
          <div className="slider__rail">
            <div className="slider__rail-inner" style={{left: `${minPos}%`, right: `${maxPos}%`}} />
          </div>
          <input
            type="range"
            className="form__range form__range_min"
            min={minValue}
            max={maxValue}
            value={valueRange.min}
            step={step}
            id="range-min"
            onChange={handleInputChange}
          />
          <input
            type="range"
            className="form__range form__range_max"
            min={minValue}
            max={maxValue}
            value={valueRange.max}
            step={step}
            onChange={handleInputChange}
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
