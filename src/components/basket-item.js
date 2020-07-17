import AbstractComponent from "../abstract/AbstractComponent";

const createBasketItem = (item) => {
  const {title, price, image, id, count = 1} = item;

  return (
    `<li class="basket__item" data-id=${id}>
      <div class="basket__item-discription">
        <a class="basket__item-link" href="card?${id}"><h3>${title}</h3></a>
        <p class="basket__item-price"><span>${price}</span> ₽ x <span class="count">${count}</span></p>
        <button class="basket__item-del red-btn" type="button">Удалить</button>
      </div>
      <div class="basket__item-img">
        <img src=${image[0]} width="80">
      </div>
    </li>`
  );
};

class BasketItem extends AbstractComponent {
  constructor(item) {
    super();

    this._item = item;
  }

  getTemplate() {
    return createBasketItem(this._item);
  }
}

export default BasketItem;
