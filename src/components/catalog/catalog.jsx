import React from "react";
import PropTypes from "prop-types";
import Sort from "../sort/sort.jsx";
import CardList from "../card-list/card-list.jsx";
import {getActiveCategory, getIsShowCategories, getOffers, getShowingOffersCount} from "../../reducer/selectors";
import {ActionCreator, Operation} from "../../reducer/data";
import {connect} from "react-redux";

const Catalog = ({offers, showingOffersCount, activeCategory, onMoreView}) => {
  return (
    <section className="store-content__cards">
      <h1 className="store-content__title visually-hidden">Свет</h1>
      <Sort/>
      <CardList
        offers = {offers}
        showingOffersCount = {showingOffersCount}
      />
      <div className="store-content__more-box">
        <button
          className="store-content__btn-more"
          type="button"
          onClick={() => { onMoreView(activeCategory)}}
        >
          Показать еще
        </button>
      </div>
    </section>
  );
};

Catalog.propTypes = {
  offers: PropTypes.array.isRequired,
  showingOffersCount: PropTypes.number.isRequired,
  activeCategory: PropTypes.number.isRequired,
  onMoreView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  showingOffersCount: getShowingOffersCount(state),
  isShowCategories: getIsShowCategories(state),
  activeCategory: getActiveCategory(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMoreView(id) {
    dispatch(ActionCreator.moreView());
    dispatch(Operation.loadOffers(id));
  }
});

export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
