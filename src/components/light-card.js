import AbstractComponent from "./AbstractComponent";
import {regexp} from "./utils";

const createCard = (card) => {
  const {title, price, image, id, vendor, available, country} = card;

  const getAvailable = (param) => param ? `В наличии` : `Нет в наличии`;

  const getTitle = () => {
    return title.match(regexp).join(``);
  };

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card.html?${id}">
            <img src=${image[0]} width="213" height="213" alt="${title}">
        </a>
        <h3 class="cards__title">${getTitle(title)}</h3>
        <p class="cards__info">${getAvailable(available)}</p>
        <p class="cards__info">Бренд: ${vendor}</p>
        <p class="cards__info">Страна: ${country}</p>
        <p class="cards__price">${price} ₽</p>
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
