import NameSpace from "../name-space";

export const getSearchOffers = (state) => state[NameSpace.SEARCH].searchOffers;

export const getShowSearchOffers = (state) => state[NameSpace.SEARCH].showSearchOffers;

export const getSearchRequest = (state) => state[NameSpace.SEARCH].searchRequest;
