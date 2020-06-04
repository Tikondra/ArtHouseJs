import CategoryComponent from "../components/category";
import {getSomeCards, getSomeCategory} from "../utils/getSome";
import {render} from "../utils/utils";
import {Place} from "../utils/consts";

class CategoriesController {
  constructor(offersModel, dataCategories) {
    this._data = dataCategories;
    this._allCategoryBtn = document.querySelector(`.sort__category-view`);
    this._categoryList = document.querySelector(`.sort__list--category`);
    this._isAddListener = null;
    this._categoryComponent = null;
  }

  render(category, offers, component, type, parentCategory) {
    const someCategoryId = getSomeCategory(category, this._data);
    const someCategories = this._data.filter((it) => someCategoryId.includes(it.id));

    this._categoryComponent = new CategoryComponent(category, type, someCategories);

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
      render(this._categoryList, this._categoryComponent.getElement(), Place.BEFOREEND);
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
}

export default CategoriesController;
