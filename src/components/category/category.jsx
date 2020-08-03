import React from "react";
import PropTypes from "prop-types";

const Category = ({category: {title, id}, activeCategory, activeFilter, sortType, type, subCategories = [], onLoadOffersByCategory}) => {
  const svg = subCategories.length > 0 ?
    <svg className="sort__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="26" height="26" fill="none">
      <use xlinkHref="#icon-arrow"/>
    </svg> :
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="26" height="26" style={{padding: `5px`}}>
    </svg>;

  const activeClass = activeCategory === id ? `sort__link--active` : ``;

  return (
    <li className="sort__item" onClick={(evt) => {
      if (evt.target.tagName !== `LI` && evt.target.tagName !== `A` && evt.target.tagName !== `UL`) {
        evt.preventDefault();
        evt.currentTarget.classList.toggle(`sort__item--open`);
      }
    }}>
      <a className={`sort__link ${activeClass}`} href="" id={id} onClick={(evt) => {
        evt.preventDefault();
        if (type === `sub`) {
          onLoadOffersByCategory(id, activeFilter, sortType);
        }
      }}>
        {svg}
        {title}
      </a>
      {subCategories.length > 0 ?
        <ul className="sort__sublist">
          {subCategories.map((it) => {
            if (it.parentId === id) {
              return (
                <Category
                  key = {it.id}
                  type={`sub`}
                  category = {it}
                  activeFilter = {activeFilter}
                  activeCategory = {activeCategory}
                  sortType = {sortType}
                  onLoadOffersByCategory = {onLoadOffersByCategory}
                />
              );
            }

            return ``;
          })}
        </ul> : ``
      }
    </li>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  subCategories: PropTypes.array,
  activeCategory: PropTypes.string,
  activeFilter: PropTypes.array,
  sortType: PropTypes.string,
  onLoadOffersByCategory: PropTypes.func.isRequired,
};

export default Category;
