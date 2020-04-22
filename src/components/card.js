import {createElement} from "./utils";

const createCard = (card) => {
  const {title, price, sale, image} = card;

  return (
    `<li class="cards__item">
      <img src=${image} width="213" height="213" alt="Название товара">
      <h3 class="cards__title">${title}</h3>
      <p class="cards__material">Материал: нерж.сталь, МДФ, пленка ПВХ.</p>
      <div class="cards__prices">
        <p class="cards__price">${sale} ₽</p>
        <p class="cards__price cards__price--sale">${price} ₽</p>
      </div>
      <div class="cards__sale-value">-10%</div>
    </li>`
  );
};

export default class Card {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCard(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
