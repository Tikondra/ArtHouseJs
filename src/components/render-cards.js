import {Place, START_SHOW_TASK, MORE_SHOW_TASK} from "./consts";
import {render} from "./utils";
import ButtonMoreComponent from "./button-more";

const buttonMoreBox = document.querySelector(`.store-content__more-box`);
const loadMoreButton = document.querySelector(`.store-content__btn-more`);

const renderCard = (container, card, Component) => {
  const cardComponent = new Component(card);

  render(container, cardComponent.getElement(card), Place.BEFOREEND);
};

export const renderCards = (container, cards, component, isSort) => {
  console.log(cards.length)
  const cardsCopy = cards.slice();
  cards.splice(0, START_SHOW_TASK)
    .forEach((card) => {
      renderCard(container, card, component);
    });

  const onMoreView = (evt) => {
    cards.splice(0, MORE_SHOW_TASK)
      .forEach((card) => renderCard(container, card, component));

    if (cards.length === 0) {
      evt.target.remove();
    }
  };

  if (isSort && cardsCopy.length > START_SHOW_TASK) {
    const buttonMoreComponent = new ButtonMoreComponent();

    render(buttonMoreBox, buttonMoreComponent.getElement(), Place.BEFOREEND);

    buttonMoreComponent.getElement().addEventListener(`click`, onMoreView);
  } else {
    loadMoreButton.addEventListener(`click`, onMoreView);
  }
};
