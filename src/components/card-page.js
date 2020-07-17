import AbstractComponent from "../abstract/AbstractComponent";
import {createImg, createPreview} from "./card-page-img";
import {getPrice} from "../utils/utils";

const createCardPage = (card) => {
  const {title, price, image, material, article} = card;

  const getImages = (pictures) => pictures.map((it) => createImg(it)).join(`\n`);
  const getPreview = (pictures) => pictures.map((it) => createPreview(it)).join(`\n`);

  return (
    `<section class="card-page">
      <h1 class="card-page__title">
        ${title}
      </h1>
      <div class="card-page__info-box">
        <div class="card-page__images">
          <ul class="card-page__list owl-carousel">
            ${getImages(image)}
          </ul>
          <ul class="card-page__gallery">
            ${getPreview(image)}
          </ul>
        </div>
        <div class="card-page__info">
          <p class="card-page__info-text card-page__info-text--price">
            <span>Цена:</span> ${getPrice(price)} ₽
          </p>
          <p class="card-page__info-text">
            <span>Артикул:</span>  ${article}
          </p>
          <p class="card-page__info-text">
            <span>Материалы:</span>  ${material}
          </p>
          <div class="check">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a" fill="transparent"/>
            </svg>
          </div>
          <button class="cards__add-basket-btn cards__add-basket-btn--page">В корзину</button>
        </div>
      </div>
    </section>`
  );
};

class CardPage extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {

    return createCardPage(this._card);
  }
}

export default CardPage;
