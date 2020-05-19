import {getOffers, getOffersFurniture, getOffersLight} from "../components/offers";
import {getCategory, getFurnitureParameters} from "../components/categories";
import {getCard} from "./load-card";
import {renderCards} from "../components/render-cards";
import {FilterType, TypeCard} from "../components/consts";
import CardComponent from "../components/card";
import CardLightComponent from "../components/light-card";
import CardFurnitureComponent from "../components/furniture-card";
import FilterController from "../controllers/filters-controller";
import CategoriesController from "../controllers/categories-controller";
import OffersModel from "../models/offers";

const convert = require(`xml-js`);

const cardBox = document.querySelector(`.cards`);
let isSort = null;

export const preloader = () => {
  document.body.classList.add(`loaded_hiding`);
  window.setTimeout(function () {
    document.body.classList.add(`loaded`);
    document.body.classList.remove(`loaded_hiding`);
  }, 500);
};

const load = (onload, url, type, parameters) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener(`load`, () => {
    if (xhr.status === 200) {

      const result = convert.xml2json(xhr.response, {compact: true});
      onload(JSON.parse(result), type, parameters);
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

  const offersModel = new OffersModel();
  offersModel.setOffers(offersDecor);

  const offersCopy = offersDecor.slice();

  const someCategory = categoriesDecor.filter((it) => {
    return it.parentId === ``;
  });

  someCategory.forEach((category) => {
    const categoriesController = new CategoriesController(offersModel, categoriesDecor);
    categoriesController.render(category, offersDecor, CardComponent);
  });

  renderCards(cardBox, offersCopy, CardComponent, isSort);
};

const loadDataToProduct = (data, type, parameters) => {
  const dataOffers = type === TypeCard.FURNITURE ? data.КоммерческаяИнформация.Каталог.Товары.Товар : data.yml_catalog.shop.offers.offer;
  let dataParameters = parameters;
  if (parameters) {
    dataParameters = getFurnitureParameters(data.КоммерческаяИнформация.Классификатор.Свойства.Свойство);
  }
  let strGET = window.location.search.replace(`?`, ``);
  let offersProduct;

  switch (type) {
    case TypeCard.DECOR:
      offersProduct = getOffers(dataOffers);
      break;
    case TypeCard.LIGHT:
      offersProduct = getOffersLight(dataOffers);
      break;
    case TypeCard.FURNITURE:
      offersProduct = getOffersFurniture(dataOffers, dataParameters);
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
  const dataOffers = data.yml_catalog.shop.offers.offer;
  const dataCategory = data.yml_catalog.shop.categories.category;

  const lightCategory = getCategory(dataCategory);
  const lightOffers = getOffersLight(dataOffers);

  const offersModel = new OffersModel();
  offersModel.setOffers(lightOffers);

  const filterController = new FilterController(offersModel, dataOffers, FilterType.LIGHT, CardLightComponent);
  filterController.render();

  const offersCopy = lightOffers.slice();
  const someCategory = lightCategory.filter((it) => {
    return it.parentId === ``;
  });

  someCategory.forEach((category) => {
    const categoriesController = new CategoriesController(offersModel, lightCategory);
    categoriesController.render(category, lightOffers, CardLightComponent);
  });

  renderCards(cardBox, offersCopy, CardLightComponent, isSort);
};

const loadDataToFurniture = (data) => {
  const dataOffers = data.КоммерческаяИнформация.Каталог.Товары.Товар;
  const dataParameters = data.КоммерческаяИнформация.Классификатор.Свойства.Свойство;

  const parametersFurniture = getFurnitureParameters(dataParameters);
  const offersFurniture = getOffersFurniture(dataOffers, parametersFurniture);

  const offersModel = new OffersModel();
  offersModel.setOffers(offersFurniture);

  const filterController = new FilterController(offersModel, dataOffers, FilterType.FURNITURE, CardFurnitureComponent, parametersFurniture);
  filterController.render();

  renderCards(cardBox, offersModel.getAllOffers(), CardFurnitureComponent, isSort);
};

export {load, loadData, loadDataToProduct, loadDataToLight, loadDataToFurniture};
