import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import FormCheck from "src/component/form/form-check";
import FilterSearch from "src/component/filter/filter-search";

const FilterList = ({list, getFiltersForServer}) => {
  const [data, setData] = useState([]);

  const search = (value) => {
    const newData = data.map((item) => {
      const find = item?.display_name.toLowerCase().startsWith(value.toLowerCase())
      return ({...item, show: find})
    });
    setData(newData);
  }

  const handleChange = (id) => {
    const checkedData = data.map(({checked, ...item}) => {
      return ({...item, checked: item.unique_id === id ? !checked : checked})
    })
    setData(checkedData);
  };

  useEffect(() => {
    setData(list.map((item) => ({...item, checked: false, show: true})));
  }, [setData]);

  useEffect(() => {
    const active = data.filter(({checked}) => checked);
    getFiltersForServer()(active);
  }, [data]);

  return (
    <>
      <FilterSearch search={search} helpShow={!data.length}/>
      <ul className="filter__list">
        {data.map(({unique_id, display_name, show, checked}) => (
          <li key={unique_id} className={`filter__list-item filter__list_${show}`}>
            <FormCheck id={unique_id} label={display_name} isChecked={checked} onClick={handleChange}/>
          </li>
        ))}
      </ul>
    </>
  );
};

FilterList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
FilterList.defaultProps = {
  list: []
};

export default FilterList;
