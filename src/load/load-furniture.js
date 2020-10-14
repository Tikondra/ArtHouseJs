import OffersModel from "../models/offers";
import CardFurnitureComponent from "../components/furniture-card";
import CardFurniturePage from "../components/card-furniture-page";
import {parseFurniture} from "../utils/parse";
import {renderCards} from "../render/render-cards";
import {sorting} from "../utils/sorting";
import {preloader, render} from "../utils/utils";
import {onAddBasket, onAddBasketCard} from "../utils/basket";
import {Place} from "../utils/consts";

export const loadFurnitureOffers = (category) => {
  const cardBox = document.querySelector(`.cards`);
  const sortSelect = document.querySelector(`.store-content__sort-select`);
  const offersModel = new OffersModel();
  const activeCategory = category ? `category=WHERE \`category_id\` = ${category}` : ``;

  const loadFurniture = fetch(`/wp-json/myplugin/v1/furniture?${activeCategory}`);

  loadFurniture
    .then((response) => response.json())
    .then(parseFurniture)
    .then((offers) => {
      offersModel.setOffers(offers);
      renderCards(cardBox, offersModel.getAllOffers(), CardFurnitureComponent);
      cardBox.addEventListener(`click`, (evt) => {
        onAddBasket(evt, offersModel);
      });
    })
    .then(() => sortSelect.addEventListener(`change`, (evt) => {
      sorting(evt, offersModel, CardFurnitureComponent);
    }))
    .then(preloader)
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
};

export const loadFurnitureOffer = () => {
  const main = document.querySelector(`main`);
  const id = window.location.search.replace(`?`, ``);
  const pageTitle = document.querySelector(`title`);
  const loadCard = fetch(`/wp-json/myplugin/v1/furniture/${id}`);

  loadCard
    .then((response) => response.json())
    .then(parseFurniture)
    .then((card) => {
      const cardPageComponent = new CardFurniturePage(card[0]);
      const cardItem = cardPageComponent.getElement(card[0]);
      cardItem.addEventListener(`click`, (evt) => {
        onAddBasketCard(evt, card[0]);
      });
      render(main, cardItem, Place.BEFOREEND);
      pageTitle.textContent = card[0].title;
    })
    .then(() => {
      // eslint-disable-next-line no-undef
      $(document).ready(function () {
        // eslint-disable-next-line no-undef
        $(`.owl-carousel`).owlCarousel({
          items: 1,
          dots: false,
          nav: true
        });
      });

      // eslint-disable-next-line no-undef
      $(`.gallery-item`).magnificPopup({
        type: `image`,
        gallery: {
          enabled: true
        }
      });
    })
    .then(preloader);
};
