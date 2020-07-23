import React from "react";
import {getPrice} from "../../utils/utils";

const getOldPrice = (priceOld) => {
  if (priceOld) {
    return (
      <p className="cards__price cards__price--old">{getPrice(priceOld)} ₽</p>
    );
  } else {
    return ``;
  }
};

const Card = ({parameters, title, price, image, id}) => {
  const activePrice = Math.floor(price);
  const oldPrice = Math.floor(parameters.current.oldPrice);
  const href = `card-light?${id}`;

  return (
    <li className="cards__item">
      <a className="cards__link" href={href}>
        <img src={image} width="213" height="213" alt="${title}" />
      </a>
      <h3 className="cards__title">${title}</h3>
      <p className="cards__info">Бренд: ${parameters.current.brend}</p>
      <p className="cards__info">Страна: ${parameters.current.country}</p>
      {getOldPrice(oldPrice)}
      <p className="cards__price">{getPrice(activePrice)} ₽</p>
    </li>
  );
};

export default Card;
