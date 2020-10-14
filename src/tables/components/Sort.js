import React from "react";
import PropTypes from "prop-types";

const Sort = ({sortType, onChangeSortType}) => {
  return (
    <div className="store-content__sort">
      <h2>Сортировка:</h2>
      <select
        className="store-content__sort-select"
        defaultValue={sortType}
        onChange={(evt) => onChangeSortType(evt.target.value)}
      >
        <option value="price-up">По возрастанию цены</option>
        <option value="price-down">По убыванию цены</option>
      </select>
    </div>
  );
};

Sort.propTypes = {
  sortType: PropTypes.string.isRequired,
  onChangeSortType: PropTypes.func.isRequired,
};

export default Sort;
