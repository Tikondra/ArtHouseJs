import React from "react";

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

export default Checkbox;
