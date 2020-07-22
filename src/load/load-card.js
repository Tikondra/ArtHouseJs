import CardPageComponent from "../components/card-page";
import CardFurniturePageComponent from "../components/card-furniture-page";
import CardChairPageComponent from "../components/card-chair-page";
import {render} from "../utils/utils";
import {Place, TypeCard} from "../utils/consts";
import {parseData} from "../utils/parse";
import {preloader} from "./load";
import {onAddBasketCard} from "../utils/basket";

const main = document.querySelector(`main`);

export const getCard = (offs, id, type, pageTitle) => {
  offs.forEach((card) => {
    if (card.id === id) {
      if (type === TypeCard.FURNITURE) {
        const cardFurniturePageComponent = new CardFurniturePageComponent(card);
        const cardItem = cardFurniturePageComponent.getElement(card);
        cardItem.addEventListener(`click`, (evt) => {
          onAddBasketCard(evt, card);
        });
        render(main, cardFurniturePageComponent.getElement(card), Place.BEFOREEND);
      } else if (type === TypeCard.CHAIR) {
        const cardChairPageComponent = new CardChairPageComponent(card);
        render(main, cardChairPageComponent.getElement(card), Place.BEFOREEND);
      }
      pageTitle.textContent = card.title;
    }
  });
};

export const loadDecorCard = () => {
  const id = window.location.search.replace(`?`, ``);
  const pageTitle = document.querySelector(`title`);
  const loadCard = fetch(`/wp-json/myplugin/v1/tovarsgarda/${id}`);

  loadCard
    .then((response) => response.json())
    .then(parseData) // возвращает массив
    .then((card) => {
      const cardPageComponent = new CardPageComponent(card[0]);
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
