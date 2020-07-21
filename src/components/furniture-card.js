import AbstractComponent from "../abstract/AbstractComponent";
import {getPrice} from "../utils/utils";

const createCard = (card) => {
  const {title, image, parameters, id} = card;
  const price = Math.floor(parameters.current.price);

  return (
    `<li class="cards__item" data-id="${id}">
        <a class="cards__link" href="card-furniture?${id}">
            <img src=${image} width="213" height="213" alt="${title}">
        </a>
        <h3 class="cards__title">${title}</h3>
        <p class="cards__info">Бренд: ${parameters.current.brand}</p>
        <p class="cards__info">Страна: ${parameters.current.country}</p>
        <p class="cards__price">${getPrice(price)} ₽</p>
        <div class="check">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a" fill="transparent"/>
          </svg>
        </div>
        <button class="cards__add-basket-btn">В корзину</button>
    </li>`
  );
};

class CardFurniture extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createCard(this._card);
  }
}

export default CardFurniture;
