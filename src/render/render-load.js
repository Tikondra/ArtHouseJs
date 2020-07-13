import CategoriesController from "../controllers/categories-controller";
import {renderCards} from "./render-cards";
import {getSomeCards} from "../utils/getSome";

const cardBox = document.querySelector(`.cards`);

const renderAll = (categories, offers, offersModel, Component, type) => {
  const someCategory = categories.filter((it) => {
    return it.parentId === `0` || it.parentId === ``;
  });

  someCategory.forEach((category) => {
    const categoriesController = new CategoriesController(offersModel, categories);
    categoriesController.render(category, offers, Component, type);
  });

  renderCards(cardBox, offers, Component);
};

const renderSortedOffers = (strGET, categories, offers, offersModel, Component, type) => {
  const parentCategory = categories.filter((it) => {
    return it.id === strGET;
  });
  const someCategory = categories.filter((it) => {
    return it.parentId === strGET;
  });
  const someCards = getSomeCards(parentCategory[0], categories, offers);
  const categoriesController = new CategoriesController(offersModel, categories);

  offersModel.setOffersByCategory(getSomeCards(parentCategory[0], categories, offers));

  categoriesController.render(parentCategory[0], offers, Component, type, true);

  [...someCategory].forEach((category) => {
    categoriesController.render(category, offers, Component, type);
  });

  renderCards(cardBox, someCards, Component);
};

export const renderLoad = (strGET, categories, offersModel, Component, type) => {
  const offers = offersModel.getOffersByCategory();
  const btnMore = document.querySelector(`.store-content__btn-more`);

  if (btnMore) {
    btnMore.remove();
  }

  if (!strGET) {
    renderAll(categories, offers, offersModel, Component, type);
  } else {
    renderSortedOffers(strGET, categories, offers, offersModel, Component, type);
  }
};
