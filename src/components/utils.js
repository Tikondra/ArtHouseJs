import {Place} from "./consts";
import {createCard} from "./card";

const cleanContainer = (container) => {
  container.innerHTML = ``;
};

const renderCard = (container, count, cards) => {

  for (let i = 0; i < count; i++) {
    render(container, createCard(cards[i]), Place.BEFOREEND);
  }
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

export {cleanContainer, renderCard, render};
