import {SortType} from "../utils/consts";

class Offers {
  constructor() {
    this._offers = [];
    this._offersByCategory = [];
    this._offersByFilter = [];
    this._sortType = SortType.DEFAULT;
  }

  getOffersByCategory() {
    if (this._offersByCategory.length > 0) {
      return this._offersByCategory.slice();
    }

    return this._offers.slice();
  }

  setOffersByCategory(offers) {
    this._offersByCategory = offers;
  }

  getOffersByFilter() {
    if (this._offersByFilter.length > 0) {
      return this._offersByFilter.slice();
    }

    return this.getOffersByCategory();
  }

  setOffersByFilter(offers) {
    this._offersByFilter = offers;
  }

  getAllOffers() {
    return this._offers.slice();
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getSortType() {
    return this._sortType;
  }

  setSortType(type) {
    this._sortType = type;
  }
}

export default Offers;
