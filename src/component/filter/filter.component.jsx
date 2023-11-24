import React from 'react';

import './filter.styles.scss';
import Collapse from 'src/component/collapse/collapse.component';
import FilterSearch from "src/component/filter/filter-search";
import FormCheck from "src/component/form/form-check";

const FilterComponent = () => {
  return (
    <aside className="filter">
      <h3 className="filter__title">Фильтры товаров</h3>
      <div className="filter__body">
        <Collapse title="Лесопилка">
          <FilterSearch/>
          <ul className="filter__list">
            <li className="filter__list-item">
              <FormCheck id="apple" label="Apple"/>
            </li>
            <li className="filter__list-item">
              <FormCheck id="coil" label="Coil"/>
            </li>
          </ul>
        </Collapse>
        <Collapse showDefault={false}>
          <FilterSearch/>
          <ul className="filter__list">
            <li className="filter__list-item">
              <FormCheck id="apple" label="Apple"/>
            </li>
            <li className="filter__list-item">
              <FormCheck id="coil" label="Coil"/>
            </li>
          </ul>
        </Collapse>
      </div>
    </aside>
  );
};

export default FilterComponent;
