import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import XIcon from 'src/component/icons/x';

const FilterSearch = ({ helpShow, search, clear }) => {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value)
  };

  const onClick = () => {
    setValue('');
  }

  useEffect(() => {
    search(value);
  }, [value])

  useEffect(() => {
    onClick();
  }, [clear])

  return (
    <div className="filter__search">
      <label htmlFor="search_brand" className="visually__hidden">Найти</label>
      <div className="filter__search-form">
        <input
          type="text"
          placeholder="Найти"
          className="form__control"
          id="search_brand"
          value={value}
          onChange={handleChange}/>
        {value && (
          <button type="reset" className="filter__search-clear" onClick={onClick}>
            <XIcon/>
          </button>
        )}
      </div>
      {helpShow && (
        <span className="filter__help">По этим критериям поиска ничего не найдено</span>
      )}
    </div>
  );
};

FilterSearch.propTypes = {
  helpShow: PropTypes.bool,
};
FilterSearch.defaultProps = {
  helpShow: false
};

export default FilterSearch;
