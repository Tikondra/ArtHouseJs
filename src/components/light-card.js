import AbstractComponent from "./AbstractComponent";
import {getPrice} from "./utils";

const createCard = (card) => {
  const {parameters, ...rest} = card;
  const price = Math.floor(rest.activePrice);
  const oldPrice = Math.floor(parameters.current.oldPrice);

  const getAvailable = (param) => {
    if (param === `true`) {
      return `В наличии`;
    } else {
      return `Нет в наличии`;
    }
  };
  const getOldPrice = (price) => {
    if (price) {
      return (
        `<p class="cards__price cards__price--old">${getPrice(price)} ₽</p>`
      )
    } else {
      return ``;
    }
  };

  const regexp = /[а-я А-Я]/iug;
  const title = rest.title.match(regexp).join(``);

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card-light.html?${rest.id}">
            <img src=${rest.image[0]} width="213" height="213" alt="${rest.title}">
        </a>
        <h3 class="cards__title">${title}</h3>
        <p class="cards__info">${getAvailable(rest.available)}</p>
        <p class="cards__info">Бренд: ${parameters.current.brend}</p>
        <p class="cards__info">Страна: ${parameters.current.country}</p>
        ${getOldPrice(oldPrice)}
        <p class="cards__price">${getPrice(price)} ₽</p>
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
