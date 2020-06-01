import AbstractComponent from "../abstract/AbstractComponent";

const createCheckbox = (item) => {
  return (
    `<li>
      <label  class="filter__input">
        <input type="checkbox" name="${item}" value="${item}">
        ${item}
      </label>
    </li>`
  );
};

const getCheckboxes = (items) => {
  return items.map((it) => createCheckbox(it)).join(`\n`);
};

const createFilter = (filter) => {
  const {type, title, items} = filter;

  return (
    `<div class="filter__item" data-type="${type}">
      <h3 class="filter__title">
        <span>${title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="15px" height="15px" fill="none">
            <use xlink:href="#icon-arrow"></use>
        </svg>
      </h3>
      <ul class="filter__checkboxes">
        ${getCheckboxes(items)}
      </ul>
    </div>`
  );
};

class Filter extends AbstractComponent {
  constructor(filter) {
    super();

    this._filter = filter;
  }

  getTemplate() {
    return createFilter(this._filter);
  }
}

export default Filter;
