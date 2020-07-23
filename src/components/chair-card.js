import AbstractComponent from "../abstract/AbstractComponent";
import {getPrice} from "../utils/utils";

const createCard = (card) => {
  const {title, image, parameters, id} = card;
  const price = Math.floor(parameters.current.price);

  return (
    `<li class="cards__item" data-id="${id}">
        <a class="cards__link" href="card-chair?${id}">
            <img src=${image} width="213" height="213" alt="${title}">
        </a>
        <h3 class="cards__title">${title}</h3>
        <p class="cards__info">Бренд: ${parameters.current.brand}</p>
        <p class="cards__info">Страна: ${parameters.current.country}</p>
        <p class="cards__price">${getPrice(price)} ₽</p>
    </li>`
  );
};

class CardChair extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createCard(this._card);
  }
}

export default CardChair;
