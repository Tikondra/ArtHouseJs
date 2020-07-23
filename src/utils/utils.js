import {Place} from "./consts";

export const render = (container, element, place) => {
  switch (place) {
    case Place.AFTERBEGIN:
      container.prepend(element);
      break;
    case Place.BEFOREEND:
      container.append(element);
      break;
    case Place.AFTERNODE:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const regexp = /[а-я А-Я \d ( )]/iug;

export const getPercent = (value, percent) => {
  return value * (1 - (percent / 100));
};

export const getPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d{3})+(\D|$))/g, `$1 `);
};

export const extend = (a, b) => Object.assign({}, a, b);

export const delLastItem = (arr) => {
  arr.splice(arr.length - 1);
  return arr;
};

export const getChecked = (container, type) => {
  const checked = [...container.querySelectorAll(`[data-type="${type}"] input[type="checkbox"]:checked`)];
  return checked.reduce((checkedList, it) => {
    checkedList.push(it.value);
    return checkedList;
  }, []);
};

export const preloader = () => {
  document.body.classList.add(`loaded_hiding`);
  window.setTimeout(function () {
    document.body.classList.add(`loaded`);
    document.body.classList.remove(`loaded_hiding`);
  }, 500);
};
