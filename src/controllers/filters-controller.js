import {getFilters, getParameters, getChecked} from "../utils/filters";
import FilterComponent from "../components/filters";
import CardLightComponent from "../components/light-card";
import {render} from "../components/utils";
import {Place} from "../components/consts";
import {renderCards} from "../components/render-cards";

class FilterController {
  constructor(offersModel, data) {
    this._offersModel = offersModel;
    this._data = data;
    this._filterForm = document.querySelector(`.filter__form`);
    this._filterBox = this._filterForm.querySelector(`.filter__box`);
    this._cardBox = document.querySelector(`.cards`);

    this._onSomeCards = this._onSomeCards.bind(this);
  }

  render() {
    const lightParameters = getParameters(this._data);
    const lightFilters = getFilters(lightParameters);

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
  };

  _onSomeCards(evt) {
    evt.preventDefault();
    const checkedByBrand = getChecked(this._filterBox, `brand`);
    const checkedByCountry = getChecked(this._filterBox, `country`);
    const checkedByStyle = getChecked(this._filterBox, `style`);
    const checkedByColor = getChecked(this._filterBox, `color`);
    const checkedBySetup = getChecked(this._filterBox, `setup`);
    const checked = [...checkedByBrand, ...checkedByCountry, ...checkedByStyle, ...checkedByColor, ...checkedBySetup];
    const offers = this._offersModel.getOffersByFilter();
    let sortedOffers = offers;

    if (checked.length > 0) {
      sortedOffers = offers.filter((it) => {
        if (checkedByBrand.length === 0) {
          return true;
        }
        return checkedByBrand.includes(it.parameters.current.brend);
      }).filter((it) => {
        if (checkedByCountry.length === 0) {
          return true;
        }
        return checkedByCountry.includes(it.parameters.current.country);
      }).filter((it) => {
        if (checkedByStyle.length === 0) {
          return true;
        }
        return checkedByStyle.includes(it.parameters.current.style);
      }).filter((it) => {
        if (checkedByColor.length === 0) {
          return true;
        }
        return checkedByColor.includes(it.parameters.current.color);
      }).filter((it) => {
        if (checkedBySetup.length === 0) {
          return true;
        }
        return checkedBySetup.includes(it.parameters.current.setup);
      });
    }

    this._cardBox.innerHTML = ``;

    const btnMore = document.querySelector(`.store-content__btn-more`);

    if (btnMore) {
      btnMore.remove();
    }

    renderCards(this._cardBox, sortedOffers, CardLightComponent, true);
  }
}

export default FilterController;