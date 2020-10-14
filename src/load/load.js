import {TypeCard} from "../utils/consts";
import CardComponent from "../components/card";
import OffersModel from "../models/offers";
import {renderLoad} from "../render/render-load";
import {sorting} from "../utils/sorting";
import {parseCategories, parseData} from "../utils/parse";
import {onAddBasket} from "../utils/basket";
import {preloader} from "../utils/utils";

const cardBox = document.querySelector(`.cards`);
const sortSelect = document.querySelector(`.store-content__sort-select`);

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
