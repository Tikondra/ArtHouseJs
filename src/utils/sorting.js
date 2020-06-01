import {SortType} from "./consts";
import {renderCards} from "../render/render-cards";

const cardBox = document.querySelector(`.cards`);

export const sorting = (offersModel, component) => {
  const offers = offersModel.getOffersByFilter().slice();
  const type = offersModel.getSortType();
  let sortedOffers = [];

  switch (type) {
    case SortType.PRICE_UP:
      sortedOffers = offers.sort((a, b) => a.activePrice - b.activePrice);
      offersModel.setSortType(SortType.PRICE_DOWN);
      break;
    case SortType.PRICE_DOWN:
      sortedOffers = offers.sort((a, b) => b.activePrice - a.activePrice);
      offersModel.setSortType(SortType.PRICE_UP);
      break;
  }

  cardBox.innerHTML = ``;

  renderCards(cardBox, sortedOffers, component);
};
