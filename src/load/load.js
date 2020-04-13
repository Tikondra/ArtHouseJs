import {renderCard, render} from "../components/utils";
import {START_SHOW_TASK, MORE_SHOW_TASK, Place} from "../components/consts";
import {createCard} from "../components/card";

const URL = `./data/decor.json`;
const STATUS_OK = 200;
const cardBox = document.querySelector(`.cards`);
const loadMoreButton = document.querySelector(`.store-content__btn-more`);
let showCardCount = START_SHOW_TASK;
let offers = [];

const load = (onload) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_OK) {
      onload(xhr.response);
    }
  });

  xhr.open(`GET`, URL);
  xhr.send();
};

const getImage = (img) => {
  if (typeof (img) === `string`) {
    return img;
  } else {
    return img[0];
  }
};

const loadCard = (data) => {
  const getOffers = () => {
    return data.reduce((cardList, card) => {
      const product = {
        title: card.name,
        price: card.price,
        image: getImage(card.picture),
        available: card.available
      };
      cardList.push(product);
      return cardList;
    }, []);
  };
  offers = getOffers();
  renderCard(cardBox, showCardCount, offers);

  loadMoreButton.addEventListener(`click`, () => {
    const prevCardCount = showCardCount;

    showCardCount += MORE_SHOW_TASK;

    offers.slice(prevCardCount, showCardCount)
      .forEach((task) => render(cardBox, createCard(task), Place.BEFOREEND));

    if (showCardCount >= offers.length) {
      loadMoreButton.remove();
    }
  });
};

export {load, loadCard};
