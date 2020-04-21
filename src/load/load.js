import {cleanContainer, render} from "../components/utils";
import {START_SHOW_TASK, MORE_SHOW_TASK, Place} from "../components/consts";
import CardComponent from "../components/card";
import CategoryComponent from "../components/category";
import ButtonMoreComponent from "../components/button-more";

const Url = {
  offers: `./data/decor.json`,
  category: `./data/category.json`
};

const STATUS_OK = 200;
const cardBox = document.querySelector(`.cards`);
const buttonMoreBox = document.querySelector(`.store-content__more-box`);
const loadMoreButton = document.querySelector(`.store-content__btn-more`);
const categoryList = document.querySelector(`.sort__list--category`);
let offers = [];
let categories = [];
let isSort = null;

const load = (onload, url) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_OK) {
      onload(xhr.response);
    }
  });

  xhr.open(`GET`, url);
  xhr.send();
};

const getImage = (img) => {
  if (typeof (img) === `string`) {
    return img;
  } else {
    return img[0];
  }
};

const getOffers = (data) => {
  return data.reduce((cardList, card) => {
    const product = {
      title: card.name,
      price: card.price,
      image: getImage(card.picture),
      available: card.available,
      categoryId: card.categoryId,
    };
    cardList.push(product);
    return cardList;
  }, []);
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

const renderCategory = (container, category) => {
  const categoryComponent = new CategoryComponent(category);

  categoryComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const someCategory = categories.filter((it) => {
      return it.parentId === category.id;
    }).reduce((catList, cat) => {
      catList.push(cat.id);
      return catList;
    }, []);
    // сравнение двух массивов
    const getTrue = (card) => {

      return card.categoryId.some((n) => someCategory.includes(n));
    };

    const someCards = offers.filter((card) => {
      if (typeof card.categoryId === `string`) {
        return card.categoryId === category.id;
      } else {
        return getTrue(card);
      }
    });

    cleanContainer(cardBox);
    const btnMore = document.querySelector(`.store-content__btn-more`);
    if (btnMore) {
      btnMore.remove();
    }
    isSort = true;

    renderCards(cardBox, someCards);
  });

  render(container, categoryComponent.getElement(category), Place.BEFOREEND);
};

const loadCard = (data) => {

  offers = getOffers(data);
  const offersCopy = offers.slice();

  renderCards(cardBox, offersCopy);
};

const getParentId = (id) => id ? id : ``;

const getCategory = (data) => {
  return data.reduce((categoriesList, card) => {
    const category = {
      title: card.title,
      id: card.id,
      parentId: getParentId(card.parentId)
    };
    categoriesList.push(category);
    return categoriesList;
  }, []);
};

const loadCategory = (data) => {
  categories = getCategory(data);
  const someCategory = categories.filter((it) => {
    return it.parentId === ``;
  });

  someCategory.forEach((category) => renderCategory(categoryList, category));
};

export {load, loadCard, loadCategory, Url};
