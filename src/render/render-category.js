import CategoryComponent from "../components/category";
import {cleanContainer, render} from "../utils/utils";
import {getSomeCards, getSomeCategory} from "../utils/getSome";
import {renderCards} from "./render-cards";
import {Place} from "../utils/consts";

const cardBox = document.querySelector(`.cards`);
const allCategoryBtn = document.querySelector(`.sort__link--category`);
const categoryList = document.querySelector(`.sort__list--category`);
let isSort = null;
let isAddListener = null;
let isSubView = null;

const onBack = (container, categories, offers, component) => {
  const someCategory = categories.filter((it) => {
    return it.parentId === ``;
  });
  cleanContainer(container);

  someCategory.forEach((it) => renderCategory(container, it, categories, offers, component));

  isSubView = null;
  allCategoryBtn.classList.remove(`sort__link--hide`);
};

const renderSubCategory = (category, categories, offers, component) => {
  const someCategory = getSomeCategory(category, categories);
  const someCategoryRender = categories.filter((it) => {
    return someCategory.includes(it.id);
  });
  cleanContainer(categoryList);
  renderCategory(categoryList, category, categories, offers, component, true);
  someCategoryRender.forEach((it) => renderCategory(categoryList, it, categories, offers, component));
  isSubView = true;
  allCategoryBtn.classList.add(`sort__link--hide`);
};

const onSortByCategory = (container, category, categories, offers, component, evt) => {
  evt.preventDefault();
  if (!evt.target.classList.contains(`sort__link--active`)) {
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

    if (!isSubView) {
      renderSubCategory(category, categories, offers, component);
    }

    renderCards(cardBox, someCards, component, isSort);
  }
};

export const renderCategory = (container, category, categories, offers, component, parentCategory) => {
  const categoryComponent = new CategoryComponent(category);

  categoryComponent.getElement()
    .addEventListener(`click`, onSortByCategory.bind({}, container, category, categories, offers, component));

  if (parentCategory) {
    categoryComponent.getElement()
      .addEventListener(`click`, onBack.bind({}, container, categories, offers, component));

    categoryComponent.getElement()
      .querySelector(`.sort__link`)
      .textContent = `Назад`;
  }

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

        renderCards(cardBox, copyOffers, component, isSort);

        isSort = null;
      }
    });

    isAddListener = true;
  }
};

