import AbstractComponent from "./AbstractComponent";
import {createImg} from "./card-page-img";

const createCardPage = (card) => {

  const {parameters, title, activePrice, image, available} = card;

  const getImages = (pictures) => pictures.map((it) => createImg(it)).join(`\n`);
  const getOldPrice = (price) => {
    if (price) {
      return (
        `<p class="card-page__info-text">
           Старая цена: ${Math.floor(price)} ₽
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
        <ul class="card-page__list owl-carousel">
          ${getImages(image)}
        </ul>
        <div class="card-page__info">
          <p class="card-page__info-text card-page__info-text--price">
            <span>Цена:</span> ${Math.floor(activePrice)} ₽
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
          <div class="card-page__box">
            ${getParameterMarkup(parameters.rest)}
          </div>
          <a class="card-page__buy-btn" href="">Купить</a>
        </div>
      </div>
      <div class="card-page__description">
        <h2>Описание:</h2>
        <p>
          Механизм трансформации «Миллениум», обладает усиленными прочностными характеристиками и удобным способом раскладывания раскладывания. При раскладывании дивана не нужно снимать подушки сидения и спинки. Габариты сиденья: длина 186см, высота 50см, глубина 60см. Спальное место : 158*196см, толщина матраса: 14см Декоративные подушки в комплект дивана не входят, их следует заказывать допонительно.
        </p>
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
