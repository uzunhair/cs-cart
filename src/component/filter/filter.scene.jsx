import React, {useState, useEffect} from 'react';

import FilterComponent from './filter.component';
import Collapse from "src/component/collapse/collapse.component";
import FilterSearch from "src/component/filter/filter-search";
import FilterList from "src/component/filter/filter-list";
import Slider from "src/component/slider/slider";
import {getJsonWithDelay} from "src/api/api";

const apiUrl = './filters.json';
const apiDelay = 100;
const filterTypes = {
  list: 'list',
  slider: 'slider',
}

const FilterScene = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterJSON, setFilterJSON] = useState([]);

  useEffect(() => {
    let ignore = false;
    getJsonWithDelay(apiUrl, apiDelay)
      .then(result => {
        if (!ignore) {
          setFilterJSON(result);
          setIsLoading(false);
          console.log(result);
        }
      })
      .catch(err => console.error(`Ошибка при получении данных: ${err}`));

    return () => {
      ignore = true;
    }
  }, [isLoading]);

  return (
    <FilterComponent>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {filterJSON.map(({unique_id, display_name, type, list_variants, ...prop}) => {
            const {
              slider_min_value,
              slider_max_value,
              slider_value_prefix,
              slider_value_suffix
            } = prop;

            return (
              <Collapse key={unique_id} showDefault={true} title={display_name}>
                {type === filterTypes.list && list_variants.length > 0 && (
                  <>
                    <FilterSearch/>
                    <FilterList list={list_variants}/>
                  </>
                )}

                {type === filterTypes.slider && (
                  <Slider
                    minValue={slider_min_value}
                    maxValue={slider_max_value}
                    prefix={slider_value_prefix}
                    suffix={slider_value_suffix}
                  />
                )}
              </Collapse>
            )
          })}
        </>
      )}
    </FilterComponent>
  );
};

export default FilterScene;
