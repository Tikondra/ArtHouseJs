import {SortType} from "./consts";
import {renderCards} from "../render/render-cards";

const cardBox = document.querySelector(`.cards`);

const sortByLight = (offers, type) =>
  type === SortType.PRICE_UP ?
    offers.sort((a, b) => a.activePrice - b.activePrice) :
    offers.sort((a, b) => b.activePrice - a.activePrice);

const sortByDecor = (offers, type) =>
  type === SortType.PRICE_UP ?
    offers.sort((a, b) => a.price - b.price) :
    offers.sort((a, b) => b.price - a.price);

const sortByFurniture = (offers, type) =>
  type === SortType.PRICE_UP ?
    offers.sort((a, b) => a.parameters.current.price - b.parameters.current.price) :
    offers.sort((a, b) => b.parameters.current.price - a.parameters.current.price);

const diffMap = {
  light: sortByLight,
  decor: sortByDecor,
  furniture: sortByFurniture,
};

export const sorting = (offersModel, component, page) => {
  const offers = offersModel.getOffersByFilter().slice();
  const type = offersModel.getSortType();
  let sortedOffers = diffMap[page](offers, type);

  if (type === SortType.PRICE_UP) {
    offersModel.setSortType(SortType.PRICE_DOWN);
  } else {
    offersModel.setSortType(SortType.PRICE_UP);
  }

  cardBox.innerHTML = ``;

  renderCards(cardBox, sortedOffers, component);
};
