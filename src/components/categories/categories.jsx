import React from "react";
import PropTypes from "prop-types";
import Category from "../category/category.jsx";

const getSubCategories = (categories, parentId) => categories.filter((category) => category.parentId === parentId);

const Categories = ({categories, activeCategory, isShow, onShowCategories, onLoadOffersByCategory}) => {
  const showListClass = isShow ? `sort__list--show-all` : ``;
  const showBtnClass = isShow ? `sort__category-view--open` : ``;
  const showBtnText = isShow ? `Скрыть категории` : `Показать все категории`;

  return (
    <nav className="sort">
      <ul className={`sort__list sort__list--category ${showListClass}`}>
        {categories.map((category) => {
          if (category.parentId === `0`) {
            return (
              <Category
                key = {category.id}
                type={`parent`}
                category = {category}
                activeCategory = {activeCategory}
                subCategories = {getSubCategories(categories, category.id)}
                onLoadOffersByCategory = {onLoadOffersByCategory}
              />
            );
          }

          return ``;
        })}
      </ul>
      <a
        className={`sort__category-view ${showBtnClass}`}
        href=""
        onClick={(evt) => {
          evt.preventDefault();
          onShowCategories(isShow);
        }}
      >
        {showBtnText}
      </a>
    </nav>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  isShow: PropTypes.bool.isRequired,
  onShowCategories: PropTypes.func.isRequired,
  onLoadOffersByCategory: PropTypes.func.isRequired,
};

export default Categories;
