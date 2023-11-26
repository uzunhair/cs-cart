import React from 'react';
import PropTypes from 'prop-types';

import './filter.styles.scss';

const FilterComponent = ({ children }) => {
  return (
    <aside className="filter">
      <h3 className="filter__title">Фильтры товаров</h3>
      <div className="filter__body">
        {children}
      </div>
    </aside>
  );
};

FilterComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

FilterComponent.defaultProps = {};

export default FilterComponent;
