import {createElement} from "../utils/utils";

const createButtonMore = () => `<button class="sort__btn-back" type="button">Назад</button>`;

class ButtonBack {
  constructor() {
    this._element = null;
  }

  getTemplate() {

    return createButtonMore();
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

export default ButtonBack;
