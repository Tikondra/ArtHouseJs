import {renderBasketItem} from "../render/render-basket-items";
import {extend} from "./utils";

const basket = document.querySelector(`.basket`);
const basketBtn = document.querySelector(`.header__basket-btn`);
const basketClose = basket.querySelector(`.basket__close`);
const basketSum = basket.querySelector(`.basket__sum span`);
const order = document.querySelector(`.order`);
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

const addBasket = (card, count = 1) => {
  sum += Number(card.price) * count;
  countBasketItems++;
  basketBtnCount.textContent = String(countBasketItems);

  basketSum.textContent = String(sum);
  renderBasketItem(card);

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
    addBasket(it, it.count);
  });
};

export const onAddBasket = (evt, offersModel) => {
  if (evt.target.tagName === `BUTTON`) {
    const offers = offersModel.getOffersByFilter();
    const cardId = evt.target.parentElement.dataset.id;
    const card = offers.find((it) => it.id === cardId);
    const basketItems = basket.querySelectorAll(`.basket__item`);
    const oldCard = basket.querySelector(`[data-id="` + card.id + `"]`);
    const check = evt.target.parentElement.querySelector(`.check`);

    addCheck(check);

    if (basketItems.length !== 0 && oldCard) {
      updateBasket(oldCard, card);
    } else {
      addBasket(card);
    }
  }
};

export const onAddBasketCard = (evt, card) => {
  if (evt.target.tagName === `BUTTON`) {
    const basketItems = basket.querySelectorAll(`.basket__item`);
    const oldCard = basket.querySelector(`[data-id="` + card.id + `"]`);
    const check = document.querySelector(`.check`);

    addCheck(check);

    if (basketItems.length !== 0 && oldCard) {
      updateBasket(oldCard, card);
    } else {
      addBasket(card);
    }
  }
};

const sendOrder = () => {
  const form = document.querySelector(`.order__form`);

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

    fetch(`https://arthouse-decor.ru/wp-content/themes/ArtHouse/assets/send.php`, {
      method: `POST`,
      body: `data=${JSON.stringify(clearData)}`,
      headers: {"Content-Type": `application/json`},
    });
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
    }
  });
  /** загрузка из LocalStorage **/
  loadLocalStorage();
};
