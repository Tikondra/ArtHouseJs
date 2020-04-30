import AbstractComponent from "./AbstractComponent";
import {createImg} from "./card-page-img";

const createCardPage = (card) => {

  const {parameters, ...rest} = card;

  const getImages = (pictures) => pictures.map((it) => createImg(it)).join(`\n`);
  const getParameterMarkup = (params) => params.map((it) => `<p class="card-page__info-text">${it}</p>`).join(`\n`);

  return (
    `<section class="card-page">
      <h1 class="card-page__title">
        ${rest.title}
      </h1>
      <div class="card-page__info-box">
        <ul class="card-page__list owl-carousel">
          ${getImages(rest.image)}
        </ul>
        <div class="card-page__info">
          <p class="card-page__info-text card-page__info-text--price">
            <span>Цена:</span> ${rest.price} ₽
          </p>
          <p class="card-page__info-text">
            <span>Наличие:</span>  ${rest.available}
          </p>
          <div class="card-page__box">
            ${getParameterMarkup(parameters)}
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
