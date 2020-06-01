import {createElement} from "../utils/utils";

const createButtonMore = () => `<button class="store-content__btn-more" type="button">Показать еще</button>`;

class ButtonMore {
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

export default ButtonMore;
