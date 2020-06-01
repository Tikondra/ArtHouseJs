import {
  getFilters,
  getParameters,
  getSortedOffersByFurniture,
  getSortedOffersByLight,
  getParametersForFurniture,
  getFiltersByFurniture,
  getParametersForChair, getFiltersByChair, getSortedOffersByChair
} from "../utils/filters";
import FilterComponent from "../components/filters";
import {render} from "../utils/utils";
import {Place} from "../utils/consts";
import {renderCards} from "../render/render-cards";

const sortedMap = {
  light: getSortedOffersByLight,
  furniture: getSortedOffersByFurniture,
  chairs: getSortedOffersByChair,
};

const toParametersMap = {
  light: getParameters,
  furniture: getParametersForFurniture,
  chairs: getParametersForChair,
};

const filtersMap = {
  light: getFilters,
  furniture: getFiltersByFurniture,
  chairs: getFiltersByChair,
};

class FilterController {
  constructor(offersModel, data, type, component, paramMap) {
    this._offersModel = offersModel;
    this._data = data;
    this._type = type;
    this._component = component;
    this._parametersMap = paramMap;
    this._filterForm = document.querySelector(`.filter__form`);
    this._filterBox = this._filterForm.querySelector(`.filter__box`);
    this._cardBox = document.querySelector(`.cards`);

    this._onSomeCards = this._onSomeCards.bind(this);
  }

  render() {
    const parameters = toParametersMap[this._type](this._data, this._parametersMap);
    const filters = filtersMap[this._type](parameters);

    filters.forEach((filter) => this.renderFilters(filter));
    this._filterForm.addEventListener(`submit`, this._onSomeCards);
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
    const sortedOffers = sortedMap[this._type](this._filterBox, offers);
    const sortedOffersCopy = sortedOffers.slice();
    this._offersModel.setOffersByFilter(sortedOffers);

    this._cardBox.innerHTML = ``;

    renderCards(this._cardBox, sortedOffersCopy, this._component);
  }
}

export default FilterController;
