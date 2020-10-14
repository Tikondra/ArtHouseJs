import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  getActiveCategory, getCategories, getFiltersByCategory, getIsShowFilter, getOffersByCategory, getSortType
} from "../../reducer/tables/selectors";
import {ActionCreator} from "../../reducer/tables/reducer";
import Categories from "./Categories";
import FilterItem from "../../components/filter-item/filter-item.jsx";

const Filter = ({
  offers, filters, categories, isShowFilter, activeCategory,
  onShowFilter, onFilterOffers, onResetFilters, onChangeCategory
}) => {
  const showClass = isShowFilter ? `filter--open` : ``;

  return (
    <Fragment>
      <button className="filter__open" type="button" onClick={() => onShowFilter(isShowFilter)}>
        Фильтр
      </button>
      <section className={`filter ${showClass}`}>
        <form className="filter__form" action="" method="" onSubmit={(evt) => {
          evt.preventDefault();
          onFilterOffers(offers);
        }}>
          <h2 className="filter__main-title">Фильтр</h2>
          <Categories
            categories = {categories}
            activeCategory = {activeCategory}
            onChangeCategory={onChangeCategory}
          />
          <div className="filter__box">
            {filters.map((filter) => <FilterItem key = {filter.type} filter = {filter}/>)}
          </div>
          <div className="filter__btn-box">
            <button className="filter__btn" type="submit">Показать</button>
            <button className="filter__btn filter__btn--reset" type="reset" onClick={onResetFilters}>
              Очистить
            </button>
          </div>
          <button className="filter__btn-close" type="button" onClick={() => onShowFilter(isShowFilter)}>Х</button>
        </form>
      </section>
    </Fragment>
  );
};

Filter.propTypes = {
  offers: PropTypes.array.isRequired,
  filters: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  isShowFilter: PropTypes.bool.isRequired,
  activeCategory: PropTypes.number,
  sortType: PropTypes.string,
  onShowFilter: PropTypes.func.isRequired,
  onFilterOffers: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffersByCategory(state),
  filters: getFiltersByCategory(state),
  categories: getCategories(state),
  activeCategory: getActiveCategory(state),
  sortType: getSortType(state),
  isShowFilter: getIsShowFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCategory(id) {
    dispatch(ActionCreator.changeActiveCategory(id));
    dispatch(ActionCreator.showFilter(true));
    dispatch(ActionCreator.resetSorting());
  },
  onShowFilter(state) {
    dispatch(ActionCreator.showFilter(state));
  },
  onFilterOffers(offers) {
    dispatch(ActionCreator.setFilters(offers));
    dispatch(ActionCreator.showFilter(true));
  },
  onResetFilters() {
    dispatch(ActionCreator.resetFilters());
  }
});

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
