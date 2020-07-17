import {Place} from "./consts";

export const cleanContainer = (container) => {
  container.innerHTML = ``;
};

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

export const makeCounter = () => {
  function counter() {
    return counter.currentCount++;
  }
  counter.currentCount = 0;

  return counter;
};

export const getPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d{3})+(\D|$))/g, `$1 `);
};

export const extend = (a, b) => Object.assign({}, a, b);
