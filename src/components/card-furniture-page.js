import AbstractComponent from "./AbstractComponent";
import {createImg} from "./card-page-img";

const createCardPage = (card) => {

  const {parameters, title, description, image} = card;

  const getImages = (pictures) => pictures.map((it) => createImg(it)).join(`\n`);

  const getParameterMarkup = (params) => {
    return params.map((it) => {
      return (
        `<p class="card-page__info-text"><span>${it.title}:</span> ${it.value}</p>`
      );
    }).join(`\n`);
  };

  const country = parameters.current.country ? `<p class="card-page__info-text"><span>Страна:</span> ${parameters.current.country}</p>` : ``;
  const brand = parameters.current.brand ? `<p class="card-page__info-text"><span>Бренд:</span> ${parameters.current.brand}</p>` : ``;
  const style = parameters.current.style ? `<p class="card-page__info-text"><span>Стиль:</span> ${parameters.current.style}</p>` : ``;
  const material = parameters.current.materialKarkas ? `<p class="card-page__info-text"><span>Материал каркаса:</span> ${parameters.current.materialKarkas}</p>` : ``;
  const materialUp = parameters.current.materialUp ? `<p class="card-page__info-text"><span>Материал столешницы:</span> ${parameters.current.materialUp}</p>` : ``;
  const size = parameters.current.size ? `<p class="card-page__info-text"><span>Размер:</span> ${parameters.current.size}</p>` : ``;
  const form = parameters.current.form ? `<p class="card-page__info-text"><span>Форма:</span> ${parameters.current.form}</p>` : ``;
  const colorBase = parameters.current.colorBase ? `<p class="card-page__info-text"><span>Цвет каркаса:</span> ${parameters.current.colorBase}</p>` : ``;
  const colorUp = parameters.current.colorUp ? `<p class="card-page__info-text"><span>Цвет столешницы:</span> ${parameters.current.colorUp}</p>` : ``;
  const room = parameters.current.room ? `<p class="card-page__info-text"><span>В какую комнату:</span> ${parameters.current.room}</p>` : ``;
  const type = parameters.current.type ? `<p class="card-page__info-text"><span>По раскладке:</span> ${parameters.current.type}</p>` : ``;

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
            <span>Цена:</span> ${Math.floor(parameters.current.price)} ₽
          </p>
            ${brand}
            ${country}
            ${material}
            ${materialUp}
            ${style}
            ${size}
            ${form}
            ${colorBase}
            ${colorUp}
            ${room}
            ${type}
          <div class="card-page__box">
            ${getParameterMarkup(parameters.service)}
          </div>
          <a class="card-page__buy-btn" href="">Купить</a>
        </div>
      </div>
      <div class="card-page__description">
        <h2>Описание:</h2>
        ${description}
      </div>
    </section>`
  );
};

class CardFurniturePage extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {

    return createCardPage(this._card);
  }
}

export default CardFurniturePage;
