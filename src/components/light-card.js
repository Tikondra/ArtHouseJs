import AbstractComponent from "../abstract/AbstractComponent";
import {getPrice} from "../utils/utils";

const createCard = (card) => {
  const {parameters, title, price, image, id, available} = card;
  const activePrice = Math.floor(price);
  const oldPrice = Math.floor(parameters.current.oldPrice);

  const getAvailable = (param) => {
    if (param === `true`) {
      return `В наличии`;
    } else {
      return `Нет в наличии`;
    }
  };
  const getOldPrice = (priceOld) => {
    if (priceOld) {
      return (
        `<p class="cards__price cards__price--old">${getPrice(priceOld)} ₽</p>`
      );
    } else {
      return ``;
    }
  };

  const regexp = /[а-я А-Я]/iug;
  const clearTitle = title.match(regexp).join(``);

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card-light.html?${id}">
            <img src=${image[0]} width="213" height="213" alt="${title}">
        </a>
        <h3 class="cards__title">${clearTitle}</h3>
        <p class="cards__info">${getAvailable(available)}</p>
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
