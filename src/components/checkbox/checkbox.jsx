import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({item}) => {
  return (
    <li>
      <label className="filter__input">
        <input
          type="checkbox"
          name={item}
          value={item}
          style={{marginRight: `5px`}}
        />
        {item}
      </label>
    </li>
  );
};

Checkbox.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Checkbox;
