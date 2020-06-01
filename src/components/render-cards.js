import {Place, START_SHOW_TASK, MORE_SHOW_TASK} from "./consts";
import {render} from "./utils";
import ButtonMoreComponent from "./button-more";

const buttonMoreBox = document.querySelector(`.store-content__more-box`);
const loadMoreButton = document.querySelector(`.store-content__btn-more`);

const renderCard = (container, card, Component) => {
  const cardComponent = new Component(card);

  render(container, cardComponent.getElement(card), Place.BEFOREEND);
};

export const renderCards = (container, cards, component) => {
  const btnMore = document.querySelector(`.store-content__btn-more`);

  if (btnMore) {
    btnMore.remove();
  }

  // eslint-disable-next-line no-console
  console.log(cards.length);
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

    const allImg = document.querySelectorAll(`img`);
    allImg.forEach((it) => {
      it.removeEventListener(`error`, onErrImg);
      it.addEventListener(`error`, onErrImg);
    });
  };

  const onErrImg = (evt) => {
    evt.target.parentElement.parentElement.remove();
    // evt.target.setAttribute(`src`, `img/no-img.jpg`);
    if (document.querySelectorAll(`.cards__item`).length < 6) {
      onMoreView();
    }
  };

  if (cardsCopy.length > START_SHOW_TASK) {
    const buttonMoreComponent = new ButtonMoreComponent();

    render(buttonMoreBox, buttonMoreComponent.getElement(), Place.BEFOREEND);

    buttonMoreComponent.getElement().addEventListener(`click`, onMoreView);
  } else {
    loadMoreButton.addEventListener(`click`, onMoreView);
  }

  const allImg = document.querySelectorAll(`img`);
  allImg.forEach((it) => {
    it.addEventListener(`error`, onErrImg);
  });
};
