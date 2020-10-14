import {renderBasketItem} from "../render/render-basket-items";
import {extend} from "./utils";
import {parseDataLight} from "./parse";

const basket = document.querySelector(`.basket`);
const basketContainer = basket.querySelector(`.basket__items`);
const basketBtn = document.querySelector(`.header__basket-btn`);
const basketClose = basket.querySelector(`.basket__close`);
const basketSum = basket.querySelector(`.basket__sum span`);
const order = document.querySelector(`.order`);
const basketEmpty = basket.querySelector(`.basket__empty`);
let basketBtnCount = document.querySelector(`.header__basket-btn span`);
let countBasketItems = Number(basketBtnCount.textContent);
let sum = 0;

const addCheck = (check) => {
  if (!check.classList.contains(`check--animate`)) {
    check.classList.add(`check--animate`);

    setTimeout(function () {
      check.classList.remove(`check--animate`);
    }, 1700);
  }
};

const getData = () => {
  const data = [];

  for (let i = 0; i < localStorage.length; i++) {
    if (!localStorage.key(i).indexOf(`basket`)) {
      const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
      data.push(item);
    }
  }

  return data;
};

const addBasket = (container, card, count = 1) => {
  const basketItems = basket.querySelectorAll(`.basket__item`);
  if (basketItems.length === 0) {
    basketEmpty.classList.add(`basket__empty--hide`);
  }

  sum += Number(card.price) * count;
  countBasketItems++;
  basketBtnCount.textContent = String(countBasketItems);

  basketSum.textContent = String(sum);
  renderBasketItem(container, card);

  const saveItem = extend(card, {
    count,
  });
  localStorage.setItem(`basket-${card.id}`, JSON.stringify(saveItem));
  localStorage.setItem(`sum`, sum);
};

const updateBasket = (oldCard, card) => {
  const countCard = oldCard.querySelector(`.count`);
  const count = Number(countCard.textContent) + 1;
  countCard.textContent = String(count);
  sum += Number(card.price);
  basketSum.textContent = String(sum);

  const saveItem = extend(card, {
    count,
  });
  localStorage.setItem(`basket-${card.id}`, JSON.stringify(saveItem));
  localStorage.setItem(`sum`, sum);
};

const loadLocalStorage = () => {
  if (localStorage.getItem(`sum`)) {
    basketSum.textContent = String(localStorage.getItem(`sum`));
  }

  const data = getData();

  data.forEach((it) => {
    addBasket(basketContainer, it, it.count);
  });
};

export const onAddBasket = (evt, offersModel) => {
  if (evt.target.tagName === `BUTTON`) {
    const offers = offersModel.getOffersByFilter();
    const cardId = evt.target.parentElement.dataset.id;
    const card = offers.find((it) => it.id === cardId);
    const basketItems = basket.querySelectorAll(`.basket__item`);
    const basketContainerToScroll = basket.querySelector(`#mCSB_1_container`);
    const oldCard = basket.querySelector(`[data-id="` + card.id + `"]`);
    const check = evt.target.parentElement.querySelector(`.check`);

    addCheck(check);

    if (basketItems.length !== 0 && oldCard) {
      updateBasket(oldCard, card);
    } else {
      addBasket(basketContainerToScroll, card);
    }
  }
};

export const onAddBasketForLight = (evt) => {
  if (evt.target.tagName === `BUTTON`) {
    const cardId = evt.target.parentElement.dataset.id;
    fetch(`/wp-json/myplugin/v1/light/${cardId}`)
      .then((response) => response.json())
      .then(parseDataLight) // возвращает массив
      .then((card) => {
        const basketItems = basket.querySelectorAll(`.basket__item`);
        const basketContainerToScroll = basket.querySelector(`#mCSB_1_container`);
        const oldCard = basket.querySelector(`[data-id="` + card[0].id + `"]`);
        const check = evt.target.parentElement.querySelector(`.check`);

        addCheck(check);

        if (basketItems.length !== 0 && oldCard) {
          updateBasket(oldCard, card[0]);
        } else {
          addBasket(basketContainerToScroll, card[0]);
        }
      });
  }
};

export const onAddBasketCard = (evt, card) => {
  if (evt.target.classList.contains(`cards__add-basket-btn`)) {
    const basketContainerToScroll = basket.querySelector(`#mCSB_1_container`);
    const basketItems = basket.querySelectorAll(`.basket__item`);
    const oldCard = basket.querySelector(`[data-id="` + card.id + `"]`);
    const check = document.querySelector(`.check`);

    addCheck(check);

    if (basketItems.length !== 0 && oldCard) {
      updateBasket(oldCard, card);
    } else {
      addBasket(basketContainerToScroll, card);
    }
  }
};

export const onAddBasketCardReact = (evt, card) => {
  const basketContainerToScroll = basket.querySelector(`#mCSB_1_container`);
  const basketItems = basket.querySelectorAll(`.basket__item`);
  const oldCard = basket.querySelector(`[data-id="` + card.id + `"]`);
  const check = evt.target.parentElement.querySelector(`.check`);

  addCheck(check);

  if (basketItems.length !== 0 && oldCard) {
    updateBasket(oldCard, card);
  } else {
    addBasket(basketContainerToScroll, card);
  }
};

const sendOrder = () => {
  const form = document.querySelector(`.order__form`);
  const formSuccess = document.querySelector(`.order__success`);

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const data = getData();
    const clearData = data.map((it) => {
      return {
        title: it.title,
        price: it.price,
        id: it.id,
        article: it.article,
        count: it.count,
        shop: it.shop,
      };
    });

    const hiddenInput = form.querySelector(`#order-data`);
    hiddenInput.value = JSON.stringify(clearData);

    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open(`POST`, `https://arthouse-decor.ru/wp-content/themes/ArtHouse/assets/send.php`);
    xhr.send(formData);

    const basketItems = basket.querySelectorAll(`.basket__item`);

    form.reset();
    localStorage.clear();
    basketItems.forEach((it) => it.remove());
    basketSum.textContent = `0`;
    basketEmpty.classList.remove(`basket__empty--hide`);
    formSuccess.classList.remove(`order__success--hide`);
    setTimeout(() => {
      formSuccess.classList.add(`order__success--hide`);
    }, 2000);
  });
};

export const initBasket = () => {
  if (order) {
    basket.classList.add(`basket--order`);
    sendOrder();
  } else {
    basketBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (countBasketItems > 0) {
        basket.classList.add(`basket--show`);
      }
    });
    basketClose.addEventListener(`click`, () => {
      basket.classList.remove(`basket--show`);
    });
  }

  /** удаление позиции из корзины **/
  basket.addEventListener(`click`, (evt) => {
    if (evt.target.className === `basket__item-del red-btn`) {
      const item = evt.target.parentElement.parentElement;
      const price = Number(item.querySelector(`.basket__item-price span`).textContent);
      const count = Number(item.querySelector(`.basket__item-price .count`).textContent);
      const id = item.dataset.id;

      item.remove();
      countBasketItems--;
      basketBtnCount.textContent = String(countBasketItems);
      sum -= price * count;
      basketSum.textContent = String(sum);

      localStorage.removeItem(`basket-${id}`);
      localStorage.setItem(`sum`, sum);

      if (basket.querySelectorAll(`.basket__item`).length === 0) {
        basketEmpty.classList.remove(`basket__empty--hide`);
      }
    }
  });
  /** загрузка из LocalStorage **/
  loadLocalStorage();
};
