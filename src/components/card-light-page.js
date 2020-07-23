import AbstractComponent from "../abstract/AbstractComponent";
import {createImg, createPreview} from "./card-page-img";
import {getPrice} from "../utils/utils";

const createCardPage = (card) => {

  const {parameters, title, price, image} = card;
  const activePrice = getPrice(Math.floor(price));
  const imageArr = [image];
  const getImages = (pictures) => pictures.map((it) => createImg(it)).join(`\n`);
  const getPreview = (pictures) => pictures.map((it) => createPreview(it)).join(`\n`);
  const getOldPrice = (val) => {
    if (val) {
      const oldPrice = getPrice(Math.floor(val));
      return (
        `<p class="card-page__info-text">
           Старая цена: ${oldPrice} ₽
         </p>`
      );
    } else {
      return ``;
    }
  };
  const getParameterMarkup = (params) => {
    return params.map((it) => {
      return (
        `<p class="card-page__info-text"><span>${it.name}:</span> ${it.value}</p>`
      );
    }).join(`\n`);
  };

  const country = parameters.current.country ? `<p class="card-page__info-text"><span>Страна:</span> ${parameters.current.country}</p>` : ``;
  const brand = parameters.current.brend ? `<p class="card-page__info-text"><span>Бренд:</span> ${parameters.current.brend}</p>` : ``;
  const style = parameters.current.style ? `<p class="card-page__info-text"><span>Стиль:</span> ${parameters.current.style}</p>` : ``;
  const color = parameters.current.color ? `<p class="card-page__info-text"><span>Цвет:</span> ${parameters.current.color}</p>` : ``;
  const setup = parameters.current.setup ? `<p class="card-page__info-text"><span>Место установки:</span> ${parameters.current.setup}</p>` : ``;
  const rest = parameters.current.rest ? `<p class="card-page__info-text"><span>В наличии:</span> ${parameters.current.rest}</p>` : ``;

  return (
    `<section class="card-page">
      <h1 class="card-page__title">
        ${title}
      </h1>
      <div class="card-page__info-box">
        <div class="card-page__images">
          <ul class="card-page__list owl-carousel">
            ${getImages(imageArr)}
          </ul>
          <ul class="card-page__gallery">
            ${getPreview(imageArr)}
          </ul>
        </div>
        <div class="card-page__info">
          <p class="card-page__info-text card-page__info-text--price">
            <span>Цена:</span> ${activePrice} ₽
          </p>
          ${getOldPrice(parameters.current.oldPrice)}
           ${country}
           ${brand}
           ${style}
           ${color}
           ${setup}
           ${rest}
          <a class="card-page__buy-btn" href="">Купить</a>
        </div>
      </div>
      <div class="card-page__description-box">
        <div class="card-page__description" style="width: 100%; max-width: none">
          <h2>Характеристики:</h2>
          <div class="card-page__box">
              ${getParameterMarkup(parameters.rest)}
          </div>
        </div>
      </div>
    </section>`
  );
};

class CardLightPage extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {

    return createCardPage(this._card);
  }
}

export default CardLightPage;
