import {getOffersFurniture, getOffersLight} from "../utils/offers";
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
import {parseCategories, parseData} from "../utils/parse";
import {onAddBasket} from "../utils/basket";

const convert = require(`xml-js`);

const cardBox = document.querySelector(`.cards`);
const sortSelect = document.querySelector(`.store-content__sort-select`);

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

export const loadData = () => {
  const strGET = window.location.search.replace(`?`, ``);
  const offersModel = new OffersModel();
  const loadDecor = fetch(`/wp-json/myplugin/v1/tovarsgarda`);

  loadDecor
    .then((response) => response.json())
    .then(parseData)
    .then((offers) => {
      offersModel.setOffers(offers);
      return offers;
    })
    .then(() => fetch(`/wp-json/myplugin/v1/categoriesgarda`))
    .then((response) => response.json())
    .then(parseCategories)
    .then((categories) => renderLoad(strGET, categories, offersModel, CardComponent, TypeCard.DECOR))
    .then(() => sortSelect.addEventListener(`change`, (evt) => {
      sorting(evt, offersModel, CardComponent);
    }))
    .then(() => cardBox.addEventListener(`click`, (evt) => {
      onAddBasket(evt, offersModel);
    }))
    .then(preloader)
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
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

  sortSelect.addEventListener(`change`, (evt) => {
    sorting(evt, offersModel, CardLightComponent);
  });
};

export const loadDataToFurniture = (data) => {
  const dataOffers = data.КоммерческаяИнформация.Каталог.Товары.Товар;
  const dataParameters = data.КоммерческаяИнформация.Классификатор.Свойства.Свойство;

  const parametersFurniture = getFurnitureParameters(dataParameters);
  const offersFurniture = getOffersFurniture(dataOffers, parametersFurniture, FilterType.FURNITURE);
  console.log(offersFurniture[2])
  console.log(parametersFurniture)
  const offersModel = new OffersModel();
  offersModel.setOffers(offersFurniture);

  const filterController = new FilterController(offersModel, dataOffers, FilterType.FURNITURE, CardFurnitureComponent, parametersFurniture);
  filterController.render();

  renderCards(cardBox, offersModel.getAllOffers(), CardFurnitureComponent);

  sortSelect.addEventListener(`change`, (evt) => {
    sorting(evt, offersModel, CardFurnitureComponent);
  });

  cardBox.addEventListener(`click`, (evt) => {
    onAddBasket(evt, offersModel);
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

  sortSelect.addEventListener(`change`, (evt) => {
    sorting(evt, offersModel, CardChairComponent);
  });
};
