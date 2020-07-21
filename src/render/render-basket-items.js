import BasketItem from "../components/basket-item";
import {render} from "../utils/utils";
import {Place} from "../utils/consts";

export const renderBasketItem = (container, card) => {
  const basketItemComponent = new BasketItem(card);

  render(container, basketItemComponent.getElement(), Place.BEFOREEND);
};
