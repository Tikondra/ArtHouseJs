import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Categories from "../categories/categories.jsx";
import FilterList from "../filter-list/filter-list.jsx";
import {getCategories, getFilters, getIsShowCategories} from "../../reducer/selectors";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data";

const Filter = ({filters, categories, isShowCategories, onShowCategories}) => {
  return (
    <Fragment>
      <button className="filter__open" type="button">Фильтр</button>
      <section className="filter">
        <form className="filter__form" action="" method="" onSubmit={(evt) => {
          evt.preventDefault();

        }}>
          <h2 className="filter__main-title">Фильтр</h2>
          <Categories
            categories = {categories}
            isShow = {isShowCategories}
            onShowCategories = {onShowCategories}
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
          <button className="filter__btn-close" type="button">Х</button>
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
};

const mapStateToProps = (state) => ({
  filters: getFilters(state),
  categories: getCategories(state),
  isShowCategories: getIsShowCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowCategories(state) {
    dispatch(ActionCreator.moreViewCategories(state));
  }
});

export {Filter};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
