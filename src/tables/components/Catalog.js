import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Sort from "./Sort";
import Card from "./Card";

import {getSortedOffers, getSortType} from "../../reducer/tables/selectors";
import {ActionCreator} from "../../reducer/tables/reducer";

const Catalog = ({offers, sortType, onChangeSortType}) => {
  const [showingOffersCount, setShowingOffersCount] = useState(9);
  const showingOffers = offers.slice(0, showingOffersCount);
  const isShowMore = showingOffersCount < offers.length;

  return (
    <section className="store-content__cards">
      <h1 className="store-content__title visually-hidden">Столы</h1>
      <Sort
        sortType = {sortType}
        onChangeSortType = {onChangeSortType}
      />
      <ul className="cards">
        {showingOffers.map((offer) => <Card key = {offer.id} offer = {offer} />)}
      </ul>
      <div className="store-content__more-box">
        {isShowMore && (
          <button
            className="store-content__btn-more" type="button"
            onClick={() => setShowingOffersCount((prev) => prev + 3)}
          >
            Показать еще
          </button>
        )}
      </div>
    </section>
  );
};

Catalog.propTypes = {
  offers: PropTypes.array.isRequired,
  sortType: PropTypes.string,
  onChangeSortType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getSortedOffers(state),
  sortType: getSortType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSortType(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  }
});

export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
