import AbstractComponent from "./AbstractComponent";

const createCard = (card) => {
  const {title, image, parameters, id} = card;

  return (
    `<li class="cards__item">
        <a class="cards__link" href="card-chair.html?${id}">
            <img src=${image} width="213" height="213" alt="${title}">
        </a>
        <h3 class="cards__title">${title}</h3>
        <p class="cards__info">Бренд: ${parameters.current.brand}</p>
        <p class="cards__info">Страна: ${parameters.current.country}</p>
        <p class="cards__price">${Math.floor(parameters.current.price)} ₽</p>
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
