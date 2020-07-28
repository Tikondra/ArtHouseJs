import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Categories from "../categories/categories.jsx";
import FilterList from "../filter-list/filter-list.jsx";
import {getCategories, getFilters, getIsShowCategories, getIsShowFilter} from "../../reducer/selectors";
import {connect} from "react-redux";
import {ActionCreator, Operation} from "../../reducer/data";

const Filter = ({
  filters, categories, isShowCategories, isShowFilter,
  onShowCategories, onShowFilter, onLoadOffersByCategory
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

        }}>
          <h2 className="filter__main-title">Фильтр</h2>
          <Categories
            categories = {categories}
            isShow = {isShowCategories}
            onShowCategories = {onShowCategories}
            onLoadOffersByCategory = {onLoadOffersByCategory}
          />
          <FilterList
            filters = {filters}
          />
          <div className="filter__btn-box">
            <button className="filter__btn" type="submit">Показать</button>
            <button className="filter__btn filter__btn--reset" type="reset">
              Очистить
            </button>
          </div>
          <button
            className="filter__btn-close"
            type="button"
            onClick={() => onShowFilter(isShowFilter)}
          >
            Х
          </button>
        </form>
      </section>
    </Fragment>
  );
};

Filter.propTypes = {
  filters: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  isShowCategories: PropTypes.bool.isRequired,
  onShowCategories: PropTypes.func.isRequired,
  isShowFilter: PropTypes.bool.isRequired,
  onShowFilter: PropTypes.func.isRequired,
  onLoadOffersByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: getFilters(state),
  categories: getCategories(state),
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

  onLoadOffersByCategory(id) {
    dispatch(Operation.loadStartOffers(id));
    dispatch(ActionCreator.changeActiveCategory(id));
  }
});

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
