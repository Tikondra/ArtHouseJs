const convert = require(`xml-js`);

import {cleanContainer, render} from "../components/utils";

import {START_SHOW_TASK, MORE_SHOW_TASK, Place} from "../components/consts";

import CardComponent from "../components/card";
import CategoryComponent from "../components/category";
import ButtonMoreComponent from "../components/button-more";

import {getOffers} from "../components/offers";
import {getCategory} from "../components/categories";
import {getCard} from "./load-card";

const cardBox = document.querySelector(`.cards`);
const buttonMoreBox = document.querySelector(`.store-content__more-box`);
const loadMoreButton = document.querySelector(`.store-content__btn-more`);
const categoryList = document.querySelector(`.sort__list--category`);
const allCategoryBtn = document.querySelector(`.sort__link--category`);
let offers = [];
let categories = [];
let isSort = null;

const load = (onload, url) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener(`load`, () => {
    if (xhr.status === 200) {

      const result = convert.xml2json(xhr.response, {compact: true});
      onload(JSON.parse(result));
    }
  });

  xhr.open(`GET`, url);
  xhr.send();
};

const loadData = (data) => {
  const dataOffers = data.yml_catalog.shop.offers.offer;
  const dataCategory = data.yml_catalog.shop.categories.category;

  offers = getOffers(dataOffers);
  categories = getCategory(dataCategory);

  const offersCopy = offers.slice();

  const someCategory = categories.filter((it) => {
    return it.parentId === ``;
  });

  someCategory.forEach((category) => renderCategory(categoryList, category));
  renderCards(cardBox, offersCopy);
};

const loadDataToProduct = (data) => {
  const dataOffers = data.yml_catalog.shop.offers.offer;
  const dataCategory = data.yml_catalog.shop.categories.category;
  let strGET = window.location.search.replace(`?`, ``);

  offers = getOffers(dataOffers);
  categories = getCategory(dataCategory);

  getCard(offers, strGET);

  $(document).ready(function () {
    $(`.owl-carousel`).owlCarousel({
      items: 1,
      dots: false,
      nav: true
    });
  });
};

const renderCards = (container, cards) => {
  cards.splice(0, START_SHOW_TASK)
    .forEach((card) => {
      renderCard(cardBox, card);
    });

  const onMoreView = (evt) => {
    cards.splice(0, MORE_SHOW_TASK)
      .forEach((card) => renderCard(cardBox, card));

    if (cards.length === 0) {
      evt.target.remove();
    }
  };

  if (isSort) {
    const buttonMoreComponent = new ButtonMoreComponent();

    render(buttonMoreBox, buttonMoreComponent.getElement(), Place.BEFOREEND);

    buttonMoreComponent.getElement().addEventListener(`click`, onMoreView);
  } else {
    loadMoreButton.addEventListener(`click`, onMoreView);
  }
};

const renderCard = (container, card) => {
  const cardComponent = new CardComponent(card);

  render(container, cardComponent.getElement(card), Place.BEFOREEND);
};

const getSomeCategory = (category) => {
  return categories.filter((it) => {
    return it.parentId === category.id;
  }).reduce((catList, cat) => {
    catList.push(cat.id);
    return catList;
  }, []);
};

const getSomeCards = (category) => {
  const someCategory = getSomeCategory(category);
  // сравнение двух массивов
  const getTrue = (card) => card.categoryId.some((n) => someCategory.includes(n));

  return offers.filter((card) => {
    if (typeof card.categoryId === `string`) {
      return card.categoryId === category.id;
    } else {
      return getTrue(card);
    }
  });
};

const renderCategory = (container, category) => {
  const categoryComponent = new CategoryComponent(category);

  categoryComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const categoryButtons = categoryList.querySelectorAll(`.sort__link`);

    categoryButtons.forEach((link) => {
      link.classList.remove(`sort__link--active`);
    });

    evt.target.classList.add(`sort__link--active`);

    const someCards = getSomeCards(category);

    cleanContainer(cardBox);

    const btnMore = document.querySelector(`.store-content__btn-more`);

    if (btnMore) {
      btnMore.remove();
    }

    isSort = true;

    renderCards(cardBox, someCards);
  });

  if (getSomeCards(category).length !== 0) {
    render(container, categoryComponent.getElement(category), Place.BEFOREEND);
  }
};

export {load, loadData, loadDataToProduct};

if (document.querySelector(`.store-content`)) {
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

      renderCards(cardBox, copyOffers);

      isSort = null;
    }

  });
}
