import BasketItem from "../components/basket-item";
import {render} from "../utils/utils";
import {Place} from "../utils/consts";

const basket = document.querySelector(`.basket__items`);

export const renderBasketItem = (item) => {
  const basketItemComponent = new BasketItem(item);

  render(basket, basketItemComponent.getElement(), Place.BEFOREEND);
};
