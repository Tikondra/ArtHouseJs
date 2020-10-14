import NameSpace from "../name-space";
import {getFiltersByFurniture} from "../../utils/filters";

export const getOffers = (state) => state[NameSpace.TABLES].offers;
export const getCategories = (state) => state[NameSpace.TABLES].categories;
export const getIsShowFilter = (state) => state[NameSpace.TABLES].isShowFilter;
export const getActiveCategory = (state) => state[NameSpace.TABLES].activeCategory;
export const getSortType = (state) => state[NameSpace.TABLES].sortType;

export const getOffersByCategory = (state) => {
  const offers = getOffers(state);
  const activeCategory = getActiveCategory(state);
  if (activeCategory === 0) {
    return offers;
  }

  return offers.filter((offer) => offer.categoryId === activeCategory);
};

export const getFiltersByCategory = (state) => {
  const offers = getOffersByCategory(state);

  return getFiltersByFurniture(offers);
};

export const getSortedOffers = (state) =>
  state[NameSpace.TABLES].sortedOffers.length
    ? state[NameSpace.TABLES].sortedOffers
    : getOffersByCategory(state);
