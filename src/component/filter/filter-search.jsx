import React from 'react';
import PropTypes from 'prop-types';

import XIcon from 'src/component/icons/x';

const FilterSearch = ({ helpShow }) => {
  return (
    <div className="filter__search">
      <label htmlFor="search_brand" className="visually__hidden">Найти</label>
      <div className="filter__search-form">
        <input type="text" placeholder="Найти" className="form__control" id="search_brand"/>
        <button type="reset" className="filter__search-clear">
          <XIcon/>
        </button>
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
