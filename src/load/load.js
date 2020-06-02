import {getOffers, getOffersFurniture, getOffersLight} from "../utils/offers";
import {getCategory, getFurnitureParameters} from "../utils/categories";
import {renderCards} from "../render/render-cards";
import {FilterType, TypeCard} from "../utils/consts";
import CardComponent from "../components/card";
import CardLightComponent from "../components/light-card";
import CardFurnitureComponent from "../components/furniture-card";
import CardChairComponent from "../components/chair-card";
import FilterController from "../controllers/filters-controller";
import OffersModel from "../models/offers";
import {renderLoad} from "../render/render-load";
import {sorting} from "../utils/sorting";

const convert = require(`xml-js`);

const cardBox = document.querySelector(`.cards`);
const priceSortBtn = document.querySelector(`.store-content__price-btn`);

export const preloader = () => {
  document.body.classList.add(`loaded_hiding`);
  window.setTimeout(function () {
    document.body.classList.add(`loaded`);
    document.body.classList.remove(`loaded_hiding`);
  }, 500);
};

export const load = (onload, url, type, parameters) => {
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

export const loadData = (data) => {
  const strGET = window.location.search.replace(`?`, ``);
  const dataOffers = data.yml_catalog.shop.offers.offer;
  const dataCategory = data.yml_catalog.shop.categories.category;

  const offersDecor = getOffers(dataOffers);
  const categoriesDecor = getCategory(dataCategory);

  const offersModel = new OffersModel();
  offersModel.setOffers(offersDecor);

  renderLoad(strGET, categoriesDecor, offersModel, CardComponent, TypeCard.DECOR);

  priceSortBtn.addEventListener(`click`, () => {
    priceSortBtn.classList.toggle(`store-content__price-btn--up`);
    sorting(offersModel, CardComponent, TypeCard.DECOR);
  });
};

export const loadDataToLight = (data) => {
  const strGET = window.location.search.replace(`?`, ``);
  const dataOffers = data.yml_catalog.shop.offers.offer;
  const dataCategory = data.yml_catalog.shop.categories.category;

  const lightCategory = getCategory(dataCategory);
  const lightOffers = getOffersLight(dataOffers);

  const offersModel = new OffersModel();
  offersModel.setOffers(lightOffers);

  const filterController = new FilterController(offersModel, dataOffers, FilterType.LIGHT, CardLightComponent);
  filterController.render();

  renderLoad(strGET, lightCategory, offersModel, CardLightComponent, `svet`);

  priceSortBtn.addEventListener(`click`, () => {
    priceSortBtn.classList.toggle(`store-content__price-btn--up`);
    sorting(offersModel, CardLightComponent, TypeCard.LIGHT);
  });
};

export const loadDataToFurniture = (data) => {
  const dataOffers = data.КоммерческаяИнформация.Каталог.Товары.Товар;
  const dataParameters = data.КоммерческаяИнформация.Классификатор.Свойства.Свойство;

  const parametersFurniture = getFurnitureParameters(dataParameters);
  const offersFurniture = getOffersFurniture(dataOffers, parametersFurniture, FilterType.FURNITURE);

  const offersModel = new OffersModel();
  offersModel.setOffers(offersFurniture);

  const filterController = new FilterController(offersModel, dataOffers, FilterType.FURNITURE, CardFurnitureComponent, parametersFurniture);
  filterController.render();

  renderCards(cardBox, offersModel.getAllOffers(), CardFurnitureComponent);

  priceSortBtn.addEventListener(`click`, () => {
    priceSortBtn.classList.toggle(`store-content__price-btn--up`);
    sorting(offersModel, CardFurnitureComponent, TypeCard.FURNITURE);
  });
};

export const loadDataToChairs = (data) => {
  const dataOffers = data.КоммерческаяИнформация.Каталог.Товары.Товар;
  const dataParameters = data.КоммерческаяИнформация.Классификатор.Свойства.Свойство;

  const parametersFurniture = getFurnitureParameters(dataParameters);
  const offersFurniture = getOffersFurniture(dataOffers, parametersFurniture, FilterType.CHAIRS);

  const offersModel = new OffersModel();
  offersModel.setOffers(offersFurniture);

  const filterController = new FilterController(offersModel, dataOffers, FilterType.CHAIRS, CardChairComponent, parametersFurniture);
  filterController.render();

  renderCards(cardBox, offersModel.getAllOffers(), CardChairComponent);

  priceSortBtn.addEventListener(`click`, () => {
    priceSortBtn.classList.toggle(`store-content__price-btn--up`);
    sorting(offersModel, CardChairComponent, TypeCard.FURNITURE);
  });
};
