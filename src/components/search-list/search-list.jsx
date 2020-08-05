import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSearchOffers, getSearchRequest, getShowSearchOffers} from "../../reducer/search/selectors";
import SearchItem from "../search-item/search-item.jsx";
import {ActionCreator, Operation} from "../../reducer/search/data";

const SearchList = ({offers, request, showSearchCount, onMoreView}) => {
  const showingOffers = offers.slice(0, showSearchCount);

  return (
    <section className="store-content__cards" style={{margin: `auto`}}>
      {offers.length === 0 ?
        <img
          src="https://arthouse-decor.ru/wp-content/themes/ArtHouse/assets/img/no-product.png"
          width="577" height="545" alt="Товар не найден" style={{margin: `auto`}} /> : ``}
      <h1 className="store-content__title visually-hidden">Результаты поиска</h1>
      <ul className="cards">
        {showingOffers.map((offer, i) => (
          <SearchItem
            key = {i}
            offer = {offer}
          />
        ))}
      </ul>
      {offers.length > 9 ?
        <div className="store-content__more-box">
          <button
            className="store-content__btn-more"
            type="button"
            onClick={() => onMoreView(request)}
          >
            Показать еще
          </button>
        </div> : ``
      }
    </section>
  );
};

SearchList.propTypes = {
  offers: PropTypes.array.isRequired,
  request: PropTypes.array.isRequired,
  showSearchCount: PropTypes.number.isRequired,
  onMoreView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getSearchOffers(state),
  request: getSearchRequest(state),
  showSearchCount: getShowSearchOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMoreView(request) {
    dispatch(ActionCreator.moreViewSearch());
    dispatch(Operation.loadMoreSearchOffers(request));
  },
});

export {SearchList};
export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
