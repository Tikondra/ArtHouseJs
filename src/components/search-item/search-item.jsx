import React from "react";

const SearchItem = ({offer: {title, image, price, href}}) => {
  return (
    <li className="cards__item">
      <a className="cards__link" href={href}>
        <img src={image[0]} width="213" height="213" alt={title} />
      </a>
      <h3 className="cards__title">{title}</h3>
      <p className="cards__price">{price} ₽</p>
    </li>
  );
};

export default SearchItem;
