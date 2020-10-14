import React from "react";
import PropTypes from "prop-types";
import {getPrice} from "../../utils/utils";
import {onAddBasketCardReact} from "../../utils/basket";

const Card = ({offer}) => {
  const {title, image, id, price, vendor, country, href} = offer;

  return (
    <li className="cards__item" data-id={id}>
      <a className="cards__link" href={href}>
        <img src={image[0]} width="213" height="213" alt={title} />
      </a>
      <h3 className="cards__title">{title}</h3>
      <p className="cards__info">Бренд: {vendor}</p>
      <p className="cards__info">Страна: {country}</p>
      <p className="cards__price">{getPrice(price)} ₽</p>
      <div className="check">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a"
            fill="transparent"/>
        </svg>
      </div>
      <button className="cards__add-basket-btn"
        onClick={(evt) => onAddBasketCardReact(evt, offer)}
      >
        В корзину
      </button>
    </li>
  );
};

Card.propTypes = {
  offer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    vendor: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })
};

export default Card;
