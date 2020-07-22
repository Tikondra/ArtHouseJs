import FilterComponent from "../components/filters";
import {Place} from "../utils/consts";
import {renderCards} from "../render/render-cards";
import {getFilters} from "../utils/filters-light";
import {getOnlyParameters} from "../utils/parameters-light";
import {render} from "../utils/utils";
import {getSortedOffersByLight} from "../utils/filters-light";

class FilterControllerLight {
  constructor(offersModel, component) {
    this._offersModel = offersModel;
    this._offers = this._offersModel.getOffersByCategory();
    this._component = component;
    this._filterForm = document.querySelector(`.filter__form`);
    this._filterBox = this._filterForm.querySelector(`.filter__box`);
    this._cardBox = document.querySelector(`.cards`);

    this._onSomeCards = this._onSomeCards.bind(this);
  }

  renderFilters(filter) {
    const filterComponent = new FilterComponent(filter);
    const filterElement = filterComponent.getElement();
    const title = filterElement.querySelector(`.filter__title`);

    title.addEventListener(`click`, function () {
      filterElement.classList.toggle(`filter__item--open`);
    });

    render(this._filterBox, filterComponent.getElement(), Place.BEFOREEND);
  }

  _onSomeCards(evt) {
    evt.preventDefault();
    const offers = this._offersModel.getOffersByCategory();
    const sortedOffers = getSortedOffersByLight(this._filterBox, offers);
    const sortedOffersCopy = sortedOffers.slice();
    this._offersModel.setOffersByFilter(sortedOffers);

    this._cardBox.innerHTML = ``;

    renderCards(this._cardBox, sortedOffersCopy, this._component);
  }

  render() {
    const parameters = getOnlyParameters(this._offers);
    const filters = getFilters(parameters);

    filters.forEach((filter) => this.renderFilters(filter));
    this._filterForm.addEventListener(`submit`, this._onSomeCards);
  }
}

export default FilterControllerLight;
