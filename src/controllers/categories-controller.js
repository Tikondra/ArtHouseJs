import CategoryComponent from "../components/category";
import {getSomeCards, getSomeCategory} from "../utils/getSome";
import {cleanContainer, render} from "../utils/utils";
import {Place} from "../utils/consts";

class CategoriesController {
  constructor(offersModel, dataCategories) {
    this._data = dataCategories;
    this._allCategoryBtn = document.querySelector(`.sort__category-view`);
    this._categoryList = document.querySelector(`.sort__list--category`);
    this._isAddListener = null;
    this._categoryComponent = null;

    this._renderSubCategory = this._renderSubCategory.bind(this);
  }

  render(category, offers, component, type, parentCategory) {
    this._categoryComponent = new CategoryComponent(category, type);

    if (parentCategory) {
      const element = this._categoryComponent.getElement();
      const link = element.querySelector(`.sort__link`);
      element.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        history.back();
      });

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

    if (this._allCategoryBtn) {
      this._allCategoryBtn.classList.add(`sort__link--hide`);
    }

    this._categoryList.querySelectorAll(`.sort__link`)
      .forEach((link) => {
        link.classList.add(`sort__link--child`);
      });
  }
}

export default CategoriesController;
