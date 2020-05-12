class Offers {
  constructor() {
    this._offers = [];
    this._sorterOffers = [];
  }

  getOffersByFilter() {
    if (this._sorterOffers.length > 0) {
      return this._sorterOffers;
    }
    return this._offers.slice();
  }

  getAllOffers() {
    return this._offers;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  setOfferByFilter(offers) {
    this._offers = offers;
  }
}

export default Offers;
