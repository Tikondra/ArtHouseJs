import React from "react";
import PropTypes from "prop-types";
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

const Card = ({offer}) => {
  const {parameters, title, price, image, id} = offer;
  const activePrice = Math.floor(price);
  const oldPrice = Math.floor(parameters.current.oldPrice);
  const href = `card-light?${id}`;

  return (
    <li className="cards__item" data-id={id}>
      <a className="cards__link" href={href}>
        <img src={image[0]} width="213" height="213" alt={title} />
      </a>
      <h3 className="cards__title">{title}</h3>
      <p className="cards__info">Бренд: {parameters.current.brend}</p>
      <p className="cards__info">Страна: {parameters.current.country}</p>
      <p className="cards__info">В наличии: {parameters.current.rest}</p>
      {getOldPrice(oldPrice)}
      <p className="cards__price">{getPrice(activePrice)} ₽</p>
      <div className="check">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a"
            fill="transparent"/>
        </svg>
      </div>
      <button className="cards__add-basket-btn">В корзину</button>
    </li>
  );
};

Card.propTypes = {
  offer: PropTypes.shape({
    parameters: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
  })
};

export default Card;
