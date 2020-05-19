import {getFilters, getParameters, getSortedOffersByFurniture, getSortedOffersByLight, getParametersForFurniture} from "../utils/filters";
import FilterComponent from "../components/filters";
import CardLightComponent from "../components/light-card";
import {render} from "../components/utils";
import {Place} from "../components/consts";
import {renderCards} from "../components/render-cards";

const filterMap = {
  light: getSortedOffersByLight,
  furniture: getSortedOffersByFurniture,
};

const toParametersrMap = {
  light: getParameters,
  furniture: getParametersForFurniture,
};

class FilterController {
  constructor(offersModel, data, type, paramMap) {
    this._offersModel = offersModel;
    this._data = data;
    this._type = type;
    this._parametersMap = paramMap;
    this._filterForm = document.querySelector(`.filter__form`);
    this._filterBox = this._filterForm.querySelector(`.filter__box`);
    this._cardBox = document.querySelector(`.cards`);

    this._onSomeCards = this._onSomeCards.bind(this);
  }

  render() {
    const parameters = toParametersrMap[this._type](this._data, this._parametersMap);
    const lightFilters = getFilters(parameters);

    lightFilters.forEach((filter) => this.renderFilters(filter));
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
    const offers = this._offersModel.getOffersByFilter();

    const sortedOffers = filterMap[this._type](this._filterBox, offers);

    this._cardBox.innerHTML = ``;

    const btnMore = document.querySelector(`.store-content__btn-more`);

    if (btnMore) {
      btnMore.remove();
    }

    renderCards(this._cardBox, sortedOffers, CardLightComponent, true);
  }
}

export default FilterController;
