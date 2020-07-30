import React from "react";
import PropTypes from "prop-types";
import Checkbox from "../checkbox/checkbox.jsx";

const getCheckboxes = (items) => items.map((it) => {
  return (
    <Checkbox
      key = {it}
      item = {it}
    />
  );
});

const FilterItem = ({filter: {type, title, items}}) => {
  return (
    <div className="filter__item" data-type={type} onClick={(evt) => {
      if (evt.target.tagName !== `LABEL` && evt.target.tagName !== `INPUT`) {
        evt.currentTarget.classList.toggle(`filter__item--open`);
      }
    }}>
      <h3 className="filter__title">
        <span>{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15 15"
          width="15"
          height="15"
          fill="none"
        >
          <use xlinkHref="#icon-arrow"/>
        </svg>
      </h3>
      <ul className="filter__checkboxes">
        {getCheckboxes(items)}
      </ul>
    </div>
  );
};

FilterItem.propTypes = {
  filter: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  })
};

export default FilterItem;
