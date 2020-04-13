export const createCard = (card) => {
  const {title, price, image, available} = card;
  const isAvailable = available ? `В наличии` : `Нет в наличии`;

  return (
    `<li class="cards__item">
        <div class="cards__img">
        <img src=${image} width="213" height="213" alt="Название товара" style="max-height: 213px;width: auto">
        </div>
        <h3>${title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 18" width="102" height="18" fill="none">
          <use xlink:href="#icon-stars"></use>
        </svg>
        <p>${isAvailable}</p>
        <p>${price} руб./шт</p>
      </li>`
  );
};
