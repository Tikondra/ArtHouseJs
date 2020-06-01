import AbstractComponent from "../abstract/AbstractComponent";
import {createImg, createPreview} from "./card-page-img";
import {getPrice} from "../utils/utils";

const createCardPage = (card) => {

  const {parameters, title, activePrice, image, available} = card;
  const price = getPrice(Math.floor(activePrice));

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
        `<p class="card-page__info-text"><span>${it._attributes.name}:</span> ${it._text}</p>`
      );
    }).join(`\n`);
  };

  const getAvailable = available ? `Да` : `Нет`;
  const country = parameters.current.country ? `<p class="card-page__info-text"><span>Страна:</span> ${parameters.current.country}</p>` : ``;
  const brand = parameters.current.brend ? `<p class="card-page__info-text"><span>Бренд:</span> ${parameters.current.brend}</p>` : ``;
  const style = parameters.current.style ? `<p class="card-page__info-text"><span>Стиль:</span> ${parameters.current.style}</p>` : ``;
  const color = parameters.current.color ? `<p class="card-page__info-text"><span>Цвет:</span> ${parameters.current.color}</p>` : ``;
  const setup = parameters.current.setup ? `<p class="card-page__info-text"><span>Место установки:</span> ${parameters.current.setup}</p>` : ``;

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
            <span>Цена:</span> ${price} ₽
          </p>
          ${getOldPrice(parameters.current.oldPrice)}
          <p class="card-page__info-text">
            <span>Наличие:</span>  ${getAvailable}
          </p>
           ${country}
           ${brand}
           ${style}
           ${color}
           ${setup}
          <a class="card-page__buy-btn" href="">Купить</a>
        </div>
      </div>
      <div class="card-page__description-box">
        <div class="card-page__description">
          <h2>Описание:</h2>
          <p>
            Механизм трансформации «Миллениум», обладает усиленными прочностными характеристиками и удобным способом раскладывания раскладывания. При раскладывании дивана не нужно снимать подушки сидения и спинки. Габариты сиденья: длина 186см, высота 50см, глубина 60см. Спальное место : 158*196см, толщина матраса: 14см Декоративные подушки в комплект дивана не входят, их следует заказывать допонительно.
          </p>
        </div>
        <div class="card-page__description">
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
