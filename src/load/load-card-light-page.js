import {parseDataLight} from "../utils/parse";
import {onAddBasketCard} from "../utils/basket";
import {render, preloader} from "../utils/utils";
import {Place} from "../utils/consts";
import CardLightPageComponent from "../components/card-light-page";

export const loadLightCardPage = () => {
  const main = document.querySelector(`main`);
  const id = window.location.search.replace(`?`, ``);
  const pageTitle = document.querySelector(`title`);
  const loadCard = fetch(`/wp-json/myplugin/v1/light/${id}`);

  loadCard
    .then((response) => response.json())
    .then(parseDataLight) // возвращает массив
    .then((card) => {
      const cardLightPageComponent = new CardLightPageComponent(card[0]);
      const cardItem = cardLightPageComponent.getElement(card[0]);
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
