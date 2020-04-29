import CategoryComponent from "./category";
import {cleanContainer, render} from "./utils";
import {getSomeCards} from "./sort";
import {renderCards} from "./render-cards";
import {Place} from "./consts";

const cardBox = document.querySelector(`.cards`);
const allCategoryBtn = document.querySelector(`.sort__link--category`);
const categoryList = document.querySelector(`.sort__list--category`);
let isSort = null;
let isAddListener = null;

export const renderCategory = (container, category, categories, offers, component) => {
  const categoryComponent = new CategoryComponent(category);

  const onSortByCategory = (evt) => {
    evt.preventDefault();

    const categoryButtons = container.querySelectorAll(`.sort__link`);

    categoryButtons.forEach((link) => {
      link.classList.remove(`sort__link--active`);
    });

    evt.target.classList.add(`sort__link--active`);

    const someCards = getSomeCards(category, categories, offers);

    cleanContainer(cardBox);

    const btnMore = document.querySelector(`.store-content__btn-more`);

    if (btnMore) {
      btnMore.remove();
    }

    isSort = true;

    renderCards(cardBox, someCards, isSort, component);
  };

  categoryComponent.getElement().addEventListener(`click`, onSortByCategory);

  if (getSomeCards(category, categories, offers).length !== 0) {
    render(container, categoryComponent.getElement(category), Place.BEFOREEND);
  }

  if (!isAddListener) {
    allCategoryBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const copyOffers = offers.slice();
      const categoryButtons = categoryList.querySelectorAll(`.sort__link`);

      categoryButtons.forEach((link) => {
        link.classList.remove(`sort__link--active`);
      });

      if (isSort) {
        cleanContainer(cardBox);

        const btnMore = document.querySelector(`.store-content__btn-more`);

        if (btnMore) {
          btnMore.remove();
        }

        renderCards(cardBox, copyOffers, isSort, component);

        isSort = null;
      }
    });

    isAddListener = true;
  }
};

