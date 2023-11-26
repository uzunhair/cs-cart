import React from 'react';
import PropTypes from 'prop-types';

import FormCheck from "src/component/form/form-check";

const FilterList = ({list}) => {
  return (
    <ul className="filter__list">
      {list.map(({unique_id, display_name}) => (
        <li key={unique_id} className="filter__list-item">
          <FormCheck id={unique_id} label={display_name} />
        </li>
      ))}
    </ul>
  );
};

FilterList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
FilterList.defaultProps = {
  list: []
};

export default FilterList;
