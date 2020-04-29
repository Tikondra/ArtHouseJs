import CardPageComponent from "../components/card-page";
import CardLightPageComponent from "../components/card-light-page";
import {render} from "../components/utils";
import {Place, TypeCard} from "../components/consts";

const main = document.querySelector(`main`);

export const getCard = (offs, id, type) => {
  offs.forEach((card) => {
    if (card.id === id) {
      if (type === TypeCard.DECOR) {
        const cardPageComponent = new CardPageComponent(card);
        render(main, cardPageComponent.getElement(card), Place.BEFOREEND);
      } else if (type === TypeCard.LIGHT) {
        const cardLightPageComponent = new CardLightPageComponent(card);
        render(main, cardLightPageComponent.getElement(card), Place.BEFOREEND);
      }
    }
  });
};
