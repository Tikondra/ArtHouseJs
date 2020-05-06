import AbstractComponent from "./AbstractComponent";

const createCard = (card) => {
  const {parameters, ...rest} = card;

  const getAvailable = (param) => {
    if (param === `true`) {
      return `В наличии`;
    } else {
      return `Нет в наличии`;
    }
  };

  const regexp = /[а-я А-Я]/iug;
  const title = rest.title.match(regexp).join(``);
  const oldPrice = parameters.filter((it) => {
    if(it.indexOf(`Старая цена`) > -1) {
      return true;
    }
  });

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card-light.html?${rest.id}">
            <img src=${rest.image[0]} width="213" height="213" alt="${rest.title}">
        </a>
        <h3 class="cards__title">${title}</h3>
        <p class="cards__info">${getAvailable(rest.available)}</p>
        <p class="cards__info">${parameters[1]}</p>
        <p class="cards__info">${parameters[2]}</p>
        <p class="cards__price cards__price--old">${oldPrice}</p>
        <p class="cards__price">${Math.floor(rest.price)} ₽</p>
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
