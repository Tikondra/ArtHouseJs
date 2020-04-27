import CardPageComponent from "../components/card-page";
import {render} from "../components/utils";
import {Place} from "../components/consts";

const main = document.querySelector(`main`);

export const getCard = (offs, id) => {
  offs.forEach((card) => {
    if (card.id === id) {
      const cardPageComponent = new CardPageComponent(card);
      render(main, cardPageComponent.getElement(card), Place.BEFOREEND);
    }
  });
};
