import {createElement} from "./utils";

const createCategory = (category) => {
  const {title, id} = category;

  return (
    `<li class="sort__item">
       <a class="sort__link" href="" id="${id}">${title}</a>
     </li>`
  );
};

export default class Category {
  constructor(category) {
    this._category = category;
    this._element = null;
  }

  getTemplate() {
    return createCategory(this._category);
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
