import AbstractComponent from "./AbstractComponent";
import {regexp} from "./utils";

const createCard = (card) => {
  const {parameters, ...rest} = card;

  const getAvailable = (param) => {
    if (param === `true`) {
      return `В наличии`;
    } else {
      return `Нет в наличии`;
    }
  };

  const getTitle = (title) => {
    return title.match(regexp).join(``);
  };

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card-light.html?${rest.id}">
            <img src=${rest.image[0]} width="213" height="213" alt="${rest.title}">
        </a>
        <h3 class="cards__title">${getTitle(rest.title)}</h3>
        <p class="cards__info">${getAvailable(rest.available)}</p>
        <p class="cards__info">${parameters[1]}</p>
        <p class="cards__info">${parameters[2]}</p>
        <p class="cards__price">${rest.price} ₽</p>
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
