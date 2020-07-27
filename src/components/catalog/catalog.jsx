import React from "react";
import PropTypes from "prop-types";
import Sort from "../sort/sort.jsx";
import CardList from "../card-list/card-list.jsx";
import {getIsShowCategories, getOffers, getShowingOffersCount} from "../../reducer/selectors";
import {ActionCreator, Operation} from "../../reducer/data";
import {connect} from "react-redux";

const Catalog = ({offers, showingOffersCount, onMoreView}) => {
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
          onClick={onMoreView}
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
  onMoreView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  showingOffersCount: getShowingOffersCount(state),
  isShowCategories: getIsShowCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMoreView() {
    dispatch(ActionCreator.moreView());
    dispatch(Operation.loadOffers());
  }
});

export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
