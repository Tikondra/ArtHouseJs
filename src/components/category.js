import {createElement} from "../utils/utils";
import {getSomeCards, getSomeCategory} from "../utils/getSome";

const getSvg = (someCategories) => {
  if (someCategories.length > 0) {
    return (
      `<svg class="sort__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="26px" height="26px" fill="none"">
        <use xlink:href="#icon-arrow"></use>
      </svg>`
    );
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="26px" height="26px" style="padding: 5px;">

    </svg>`
  );
};

const createSubCategory = (category, type, dataCategories, offers) => {
  const getSubCategory = () => someCategories.map((it) => createSubCategory(it, type, dataCategories, offers)).join(`\n`);
  const {title, id} = category;
  const someCategoryId = getSomeCategory(category, dataCategories);
  const someCategories = dataCategories.filter((it) => someCategoryId.includes(it.id));
  const someCards = getSomeCards(category, dataCategories, offers);

  return someCards.length === 0 ? `` :
    `<li class="sort__item">
        <a class="sort__link sort__link--sub" href="${type}?${id}" id="${id}">
            ${getSvg(someCategories)}
            ${title}
        </a>
        <ul class="sort__sublist">
          ${getSubCategory()}
        </ul>
     </li>`;
};

const createCategory = (category, type, someCategories, dataCategories, offers) => {
  const {title, id} = category;
  const getSubCategory = () => someCategories.map((it) => createSubCategory(it, type, dataCategories, offers)).join(`\n`);

  return (
    `<li class="sort__item">
       <a class="sort__link" href="${type}?${id}" id="${id}">
          ${getSvg(someCategories)}
          ${title}
       </a>
       <ul class="sort__sublist">
          ${getSubCategory()}
       </ul>
     </li>`
  );
};

export default class Category {
  constructor(category, type, someCategories, dataCategories, offers) {
    this._someCategories = someCategories;
    this._dataCategories = dataCategories;
    this._offers = offers;
    this._category = category;
    this._element = null;
    this._type = type;
  }

  getTemplate() {
    return createCategory(this._category, this._type, this._someCategories, this._dataCategories, this._offers);
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
