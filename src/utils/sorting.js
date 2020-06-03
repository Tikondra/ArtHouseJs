import {renderCards} from "../render/render-cards";

const cardBox = document.querySelector(`.cards`);

const getDefault = (offers) => {
  return offers;
};

const getPriceUp = (offers) => {
  return offers.sort((a, b) => a.price - b.price);
};

const getPriceDown = (offers) => {
  return offers.sort((a, b) => b.price - a.price);
};

const sortMap = {
  "default": getDefault,
  "price-up": getPriceUp,
  "price-down": getPriceDown,
};

export const sorting = (evt, offersModel, component) => {
  const sortType = evt.target.value;
  const activeSortType = offersModel.getSortType();

  if (sortType === activeSortType) {
    return;
  }

  offersModel.setSortType(sortType);

  const offers = offersModel.getOffersByFilter().slice();
  let sortedOffers = sortMap[sortType](offers);

  cardBox.innerHTML = ``;

  renderCards(cardBox, sortedOffers, component);
};
