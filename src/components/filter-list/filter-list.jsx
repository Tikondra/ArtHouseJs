import React from "react";
import FilterItem from "../filter-item/filter-item.jsx";

const getFilter = (filters) => filters.map((filter) => {
  return (
    <FilterItem
      key = {filter.type}
      filter = {filter}
    />
  );
});

const FilterList = ({filters}) => {
  return (
    <div className="filter__box">
      {getFilter(filters)}
    </div>
  );
};

export default FilterList;

