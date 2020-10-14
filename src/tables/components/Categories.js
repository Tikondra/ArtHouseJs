import React from "react";
import PropTypes from "prop-types";

const Categories = ({categories, activeCategory, onChangeCategory}) => {
  const className = (id) => activeCategory === id ? `category category--active` : `category`;

  return (
    <div>
      {categories.map((category) => {
        return (
          <h2
            className={className(category.id)} key={category.id}
            onClick={() => onChangeCategory(category.id)}
          >
            {category.title}
          </h2>
        );
      })}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  activeCategory: PropTypes.number,
  onChangeCategory: PropTypes.func.isRequired
};

export default Categories;
