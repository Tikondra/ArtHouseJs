import {TypeCard} from "../components/consts";

const convert = require(`xml-js`);

import {getOffers, getOffersLight} from "../components/offers";
import {getCategory} from "../components/categories";
import {getCard} from "./load-card";
import {renderCategory} from "../components/render-category";
import {renderCards} from "../components/render-cards";
import {getFilters, getParameters, onCheckedData, renderFilters} from "../utils/filters";

import CardComponent from "../components/card";
import CardLightComponent from "../components/light-card";

const cardBox = document.querySelector(`.cards`);
const categoryList = document.querySelector(`.sort__list--category`);
let isSort = null;

const preloader = () => {
  document.body.classList.add(`loaded_hiding`);
  window.setTimeout(function () {
    document.body.classList.add(`loaded`);
    document.body.classList.remove(`loaded_hiding`);
  }, 500);
};

const load = (onload, url, type) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener(`load`, () => {
    if (xhr.status === 200) {

      const result = convert.xml2json(xhr.response, {compact: true});
      onload(JSON.parse(result), type);
      preloader();
    }
  });

  xhr.open(`GET`, url);
  xhr.send();
};

const loadData = (data) => {
  const dataOffers = data.yml_catalog.shop.offers.offer;
  const dataCategory = data.yml_catalog.shop.categories.category;

  const offersDecor = getOffers(dataOffers);
  const categoriesDecor = getCategory(dataCategory);

  const offersCopy = offersDecor.slice();

  const someCategory = categoriesDecor.filter((it) => {
    return it.parentId === ``;
  });

  someCategory.forEach((category) => renderCategory(categoryList, category, categoriesDecor, offersDecor, CardComponent));
  renderCards(cardBox, offersCopy, isSort, CardComponent);
};

const loadDataToProduct = (data, type) => {
  const dataOffers = data.yml_catalog.shop.offers.offer;
  let strGET = window.location.search.replace(`?`, ``);
  let offersProduct;

  switch (type) {
    case TypeCard.DECOR:
      offersProduct = getOffers(dataOffers);
      break;
    case TypeCard.LIGHT:
      offersProduct = getOffersLight(dataOffers);
      break;
  }

  getCard(offersProduct, strGET, type);

  // eslint-disable-next-line no-undef
  $(document).ready(function () {
    // eslint-disable-next-line no-undef
    $(`.owl-carousel`).owlCarousel({
      items: 1,
      dots: false,
      nav: true
    });
  });
};

const loadDataToLight = (data) => {
  const filterForm = document.querySelector(`.filter__form`);
  const dataOffers = data.yml_catalog.shop.offers.offer;
  const dataCategory = data.yml_catalog.shop.categories.category;

  const lightCategory = getCategory(dataCategory);
  const lightOffers = getOffersLight(dataOffers);
  const lightParameters = getParameters(dataOffers);
  const lightFilters = getFilters(lightParameters);
  const offersCopy = lightOffers.slice();
  const someCategory = lightCategory.filter((it) => {
    return it.parentId === ``;
  });

  someCategory.forEach((category) => renderCategory(categoryList, category, lightCategory, lightOffers, CardLightComponent));
  lightFilters.forEach((filter) => renderFilters(filter));
  renderCards(cardBox, offersCopy, isSort, CardLightComponent);

  filterForm.addEventListener(`submit`, onCheckedData);
};

export {load, loadData, loadDataToProduct, loadDataToLight};
