class Offers {
  constructor() {
    this._offers = [];
    this._sorterOffers = [];
  }

  getOffersByFilter() {
    if (this._sorterOffers.length > 0) {
      return this._sorterOffers.slice();
    }
    return this._offers.slice();
  }

  getAllOffers() {
    return this._offers.slice();
  }

  setOffers(offers) {
    this._offers = offers;
  }

  setOfferByFilter(offers) {
    this._sorterOffers = offers;
  }
}

export default Offers;
