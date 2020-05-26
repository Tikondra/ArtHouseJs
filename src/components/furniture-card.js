import AbstractComponent from "./AbstractComponent";
import {getPrice} from "./utils";

const createCard = (card) => {
  const {title, image, parameters, id} = card;
  const price = Math.floor(parameters.current.price);

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card-furniture.html?${id}">
            <img src=${image} width="213" height="213" alt="${title}">
        </a>
        <h3 class="cards__title">${title}</h3>
        <p class="cards__info">Бренд: ${parameters.current.brand}</p>
        <p class="cards__info">Страна: ${parameters.current.country}</p>
        <p class="cards__price">${getPrice(price)} ₽</p>
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
