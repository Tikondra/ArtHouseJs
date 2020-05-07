import {sortingParameters} from "../components/offers";
import FilterComponent from "../components/filters";
import {render} from "../components/utils";
import {Place} from "../components/consts";

const filterBox = document.querySelector(`.filter__box`);

export const getParameters = (data) => {
  return data.reduce((filterList, card) => {
    const product = {
      parameters: sortingParameters(card.param)
    };
    filterList.push(product);
    return filterList;
  }, []);
};

export const getFilters = (parameters) => {
  const vendors = [];
  const countries = [];

  const allFilters = [
    {
      title: `Бренд`,
      items: vendors
    },
    {
      title: `Страна`,
      items: countries
    }
  ];

  parameters.map((parameter) => {

    if (!vendors.includes(parameter.parameters.current.brend) && parameter.parameters.current.brend) {
      vendors.push(parameter.parameters.current.brend);
    } else if (!countries.includes(parameter.parameters.current.country) && parameter.parameters.current.country) {
      countries.push(parameter.parameters.current.country);
    }
  });

  return allFilters;
};

export const renderFilters = (filter) => {
  const filterComponent = new FilterComponent(filter);
  const filterElement = filterComponent.getElement();
  const title = filterElement.querySelector(`.filter__title`);

  title.addEventListener(`click`, function () {
    filterElement.classList.toggle(`filter__item--open`);
  });

  render(filterBox, filterComponent.getElement(), Place.BEFOREEND);
};

export const getSomeCards = (offers) => {

};

export const onCheckedData = (evt) => {
  evt.preventDefault();
  alert(`В разработке!¯\\_(ツ)_/¯ `);
};
