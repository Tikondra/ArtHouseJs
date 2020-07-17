import {getPrice, regexp} from "../utils/utils";
import AbstractComponent from "../abstract/AbstractComponent";

const createCard = (card) => {
  const {title, price, image, id, material} = card;
  const getTitle = () => {
    return title.match(regexp).join(``);
  };

  return (
    `<li class="cards__item" data-id="${id}">
        <a class="cards__link" href="card?${id}">
            <img src=${image[0]} width="213" height="213" alt="${title}">
        </a>
        <h3 class="cards__title">${getTitle()}</h3>
        <p class="cards__material">${material}</p>
        <div class="cards__prices">
            <p class="cards__price">${getPrice(price)} ₽</p>
        </div>
        <div class="check">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a" fill="transparent"/>
          </svg>
        </div>
        <button class="cards__add-basket-btn">В корзину</button>
    </li>`
  );
};

class Card extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createCard(this._card);
  }
}

export default Card;
