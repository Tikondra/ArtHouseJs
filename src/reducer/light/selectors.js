import NameSpace from "../name-space";

export const getOffers = (state) => state[NameSpace.LIGHT].offers;

export const getShowingOffersCount = (state) => state[NameSpace.LIGHT].showingOffers;

export const getFilters = (state) => state[NameSpace.LIGHT].filters;

export const getCategories = (state) => state[NameSpace.LIGHT].categories;

export const getIsShowCategories = (state) => state[NameSpace.LIGHT].isShowCategories;

export const getIsShowFilter = (state) => state[NameSpace.LIGHT].isShowFilter;

export const getActiveCategory = (state) => state[NameSpace.LIGHT].activeCategory;

export const getActiveFilter = (state) => state[NameSpace.LIGHT].request;

export const getSortType = (state) => state[NameSpace.LIGHT].sortType;
