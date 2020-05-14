import CategoryComponent from "../components/category";
import {getSomeCards, getSomeCategory} from "../components/sort";
import {cleanContainer, render} from "../components/utils";
import {Place} from "../components/consts";
import {renderCards} from "../components/render-cards";

class CategoriesController {
  constructor(offersModel, dataCategories) {
    this._offersModel = offersModel;
    this._data = dataCategories;

    this._cardBox = document.querySelector(`.cards`);
    this._allCategoryBtn = document.querySelector(`.sort__category-view`);
    this._categoryList = document.querySelector(`.sort__list--category`);
    this._form = document.querySelector(`.filter__form`);
    this._isSort = null;
    this._isAddListener = null;
    this._isSubView = null;
    this._categoryComponent = null;

    this._onSortByCategory = this._onSortByCategory.bind(this);
    this._renderSubCategory = this._renderSubCategory.bind(this);
    this._onBack = this._onBack.bind(this);
  }

  render(category, offers, component, parentCategory) {
    this._categoryComponent = new CategoryComponent(category);

    this._categoryComponent.getElement()
      .addEventListener(`click`, this._onSortByCategory.bind({}, this._categoryList, category, this._data, offers, component));

    if (parentCategory) {
      const element = this._categoryComponent.getElement();
      const link = element.querySelector(`.sort__link`);
      element.addEventListener(`click`, this._onBack.bind({}, this._categoryList, this._data, offers, component));

      link.classList.add(`sort__link--parent`);
      link.innerHTML = `${link.textContent}<span class="sort__link--back">назад</span>`;
    }

    if (getSomeCards(category, this._data, offers).length !== 0) {
      render(this._categoryList, this._categoryComponent.getElement(category), Place.BEFOREEND);
    }

    if (!this._isAddListener && this._allCategoryBtn) {
      this._allCategoryBtn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._allCategoryBtn.classList.toggle(`sort__category-view--open`);

        if (this._allCategoryBtn.textContent === `Показать все категории`) {
          this._allCategoryBtn.textContent = `Скрыть категории`;
        } else {
          this._allCategoryBtn.textContent = `Показать все категории`;
        }

        this._categoryList.classList.toggle(`sort__list--show-all`);
      });

      this._isAddListener = true;
    }
  }

  _renderSubCategory(category, categories, offers, component) {
    const someCategory = getSomeCategory(category, categories);
    const someCategoryRender = categories.filter((it) => {
      return someCategory.includes(it.id);
    });
    cleanContainer(this._categoryList);
    this.render(category, offers, component, true);
    someCategoryRender.forEach((it) => this.render(it, offers, component));
    this._isSubView = true;

    if (this._allCategoryBtn) {
      this._allCategoryBtn.classList.add(`sort__link--hide`);
    }

    this._categoryList.querySelectorAll(`.sort__link`)
      .forEach((link) => {
        link.classList.add(`sort__link--child`);
      });
  }

  _onBack(container, categories, offers, component) {
    const copyOffers = this._offersModel.getAllOffers();

    const someCategory = categories.filter((it) => {
      return it.parentId === ``;
    });

    cleanContainer(container);

    someCategory.forEach((it) => this.render(it, offers, component));

    this._isSubView = null;

    if (this._allCategoryBtn) {
      this._allCategoryBtn.classList.remove(`sort__link--hide`);
    }

    if (this._isSort) {
      cleanContainer(this._cardBox);

      const btnMore = document.querySelector(`.store-content__btn-more`);

      if (btnMore) {
        btnMore.remove();
      }

      renderCards(this._cardBox, copyOffers, component, this._isSort);

      this._isSort = null;
    }
  }

  _onSortByCategory(container, category, categories, offers, component, evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains(`sort__link--active`)) {
      const categoryButtons = container.querySelectorAll(`.sort__link`);
      const filters = this._form.querySelectorAll(`.filter__input input`);

      categoryButtons.forEach((link) => {
        link.classList.remove(`sort__link--active`);
      });

      filters.forEach((filter) => {
        filter.checked = false;
      });

      evt.target.classList.add(`sort__link--active`);

      const someCards = getSomeCards(category, categories, offers);

      this._offersModel.setOfferByFilter(getSomeCards(category, categories, offers));

      cleanContainer(this._cardBox);

      const btnMore = document.querySelector(`.store-content__btn-more`);

      if (btnMore) {
        btnMore.remove();
      }

      this._isSort = true;

      if (!this._isSubView) {
        this._renderSubCategory(category, categories, offers, component);
      }

      renderCards(this._cardBox, someCards, component, this._isSort);
    }
  }
}

export default CategoriesController;
