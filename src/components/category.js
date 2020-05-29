import {createElement} from "./utils";

const createCategory = (category, type) => {
  const {title, id} = category;

  return (
    `<li class="sort__item">
       <a class="sort__link" href="${type}.html?${id}" id="${id}">${title}</a>
     </li>`
  );
};

export default class Category {
  constructor(category, type) {
    this._category = category;
    this._element = null;
    this._type = type;
  }

  getTemplate() {
    return createCategory(this._category, this._type);
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
