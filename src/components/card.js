import {regexp} from "./utils";
import AbstractComponent from "./AbstractComponent";

const createCard = (card) => {
  const {title, price, sale, image, id, material} = card;
  const getTitle = () => {
    return title.match(regexp).join(``);
  };

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card.html?${id}">
            <img src=${image[0]} width="213" height="213" alt="Название товара">
        </a>
        <h3 class="cards__title">${getTitle()}</h3>
        <p class="cards__material">${material}</p>
        <div class="cards__prices">
            <p class="cards__price">${sale} ₽</p>
            <p class="cards__price cards__price--sale">${price} ₽</p>
        </div>
        <div class="cards__sale-value">-10%</div>
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
