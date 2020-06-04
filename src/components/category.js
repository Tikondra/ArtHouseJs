import {createElement} from "../utils/utils";

const createSubCategory = (category, type) => {
  const {title, id} = category;

  return (
    `<li>
        <a class="sort__link sort__link--sub" href="${type}.html?${id}" id="${id}">${title}</a>
     </li>`
  );
};

const createCategory = (category, type, someCategories) => {
  const {title, id} = category;
  const getSubCategory = () => someCategories.map((it) => createSubCategory(it, type)).join(`\n`);

  return (
    `<li class="sort__item">
       <a class="sort__link" href="${type}.html?${id}" id="${id}">${title}</a>
       <ul class="sort__sublist">
          ${getSubCategory()}
       </ul>
     </li>`
  );
};

export default class Category {
  constructor(category, type, someCategories) {
    this._someCategories = someCategories;
    this._category = category;
    this._element = null;
    this._type = type;
  }

  getTemplate() {
    return createCategory(this._category, this._type, this._someCategories);
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
