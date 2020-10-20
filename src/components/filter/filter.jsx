import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Categories from "../categories/categories.jsx";
import FilterList from "../filter-list/filter-list.jsx";
import {
  getActiveCategory, getActiveFilter,
  getCategories,
  getFilters,
  getIsShowCategories,
  getIsShowFilter, getSortType
} from "../../reducer/light/selectors";
import {connect} from "react-redux";
import {ActionCreator, Operation} from "../../reducer/light/data";
import {getChecked} from "../../utils/utils";

const Filter = ({
  filters, categories, isShowCategories, isShowFilter, activeCategory, activeFilter, sortType,
  onShowCategories, onShowFilter, onLoadOffersByCategory, onFilterOffers, onResetFilters
}) => {
  const showClass = isShowFilter ? `filter--open` : ``;

  return (
    <Fragment>
      <button
        className="filter__open"
        type="button"
        onClick={() => onShowFilter(isShowFilter)}
      >
        Фильтр
      </button>
      <section className={`filter ${showClass}`}>
        <form className="filter__form" action="" method="" onSubmit={(evt) => {
          evt.preventDefault();
          const filterBox = document.querySelector(`.filter__box`);
          const checkedByBrand = getChecked(filterBox, `1`);
          const checkedByCountry = getChecked(filterBox, `2`);
          const checkedByStyle = getChecked(filterBox, `23`);
          const checkedByColor = getChecked(filterBox, `18`);
          const checkedBySetup = getChecked(filterBox, `21`);
          const checked = [...checkedByBrand, ...checkedByCountry, ...checkedByStyle, ...checkedByColor, ...checkedBySetup];

          onFilterOffers(activeCategory, checked, sortType);
        }}>
          <h2 className="filter__main-title">Фильтр</h2>
          <Categories
            categories = {categories}
            activeFilter = {activeFilter}
            activeCategory = {activeCategory}
            sortType = {sortType}
            isShow = {isShowCategories}
            onShowCategories = {onShowCategories}
            onLoadOffersByCategory = {onLoadOffersByCategory}
          />
          <FilterList
            filters = {filters}
          />
          <div className="filter__btn-box">
            <button className="filter__btn" type="submit">Показать</button>
            <button className="filter__btn filter__btn--reset" type="reset" onClick={onResetFilters}>
              Очистить
            </button>
          </div>
          <button
            className="filter__btn-close"
            type="button"
            onClick={() => onShowFilter(isShowFilter)}
          >Х</button>
        </form>
      </section>
    </Fragment>
  );
};

Filter.propTypes = {
  filters: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  isShowCategories: PropTypes.bool.isRequired,
  isShowFilter: PropTypes.bool.isRequired,
  activeCategory: PropTypes.string,
  activeFilter: PropTypes.array,
  sortType: PropTypes.string,
  onShowCategories: PropTypes.func.isRequired,
  onShowFilter: PropTypes.func.isRequired,
  onLoadOffersByCategory: PropTypes.func.isRequired,
  onFilterOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: getFilters(state),
  categories: getCategories(state),
  activeCategory: getActiveCategory(state),
  activeFilter: getActiveFilter(state),
  sortType: getSortType(state),
  isShowCategories: getIsShowCategories(state),
  isShowFilter: getIsShowFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowCategories(state) {
    dispatch(ActionCreator.moreViewCategories(state));
  },

  onShowFilter(state) {
    dispatch(ActionCreator.showFilter(state));
  },

  onLoadOffersByCategory(id, request, sortType, subCategories) {
    dispatch(Operation.loadStartOffers(id, request, sortType, subCategories));
    dispatch(ActionCreator.changeActiveCategory(id));
    dispatch(ActionCreator.showFilter(true));
  },

  onFilterOffers(id, request, sortType) {
    dispatch(Operation.loadStartOffers(id, request, sortType));
    dispatch(ActionCreator.showFilter(true));
  },

  onResetFilters() {
    dispatch(ActionCreator.resetFilters());
  }
});

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
