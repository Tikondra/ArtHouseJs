import AbstractComponent from "../abstract/AbstractComponent";
import {getPrice} from "../utils/utils";

const createCard = (card) => {
  const {parameters, title, price, image, id} = card;
  const activePrice = Math.floor(price);
  const oldPrice = Math.floor(parameters.current.oldPrice);

  const getOldPrice = (priceOld) => {
    if (priceOld) {
      return (
        `<p class="cards__price cards__price--old">${getPrice(priceOld)} ₽</p>`
      );
    } else {
      return ``;
    }
  };

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card-light?${id}">
            <img src=${image} width="213" height="213" alt="${title}">
        </a>
        <h3 class="cards__title">${title}</h3>
        <p class="cards__info">Бренд: ${parameters.current.brend}</p>
        <p class="cards__info">Страна: ${parameters.current.country}</p>
        ${getOldPrice(oldPrice)}
        <p class="cards__price">${getPrice(activePrice)} ₽</p>
    </li>`
  );
};

class CardLight extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createCard(this._card);
  }
}

export default CardLight;
