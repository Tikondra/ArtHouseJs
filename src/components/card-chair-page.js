import AbstractComponent from "../abstract/AbstractComponent";
import {createImg, createPreview} from "./card-page-img";
import {getPrice} from "../utils/utils";

const createCardPage = (card) => {

  const {parameters, title, description, image} = card;
  const getImages = (pictures) => pictures.map((it) => createImg(it)).join(`\n`);
  const getPreview = (pictures) => pictures.map((it) => createPreview(it)).join(`\n`);

  const price = Math.floor(parameters.current.price);
  const brand = parameters.current.brand ? `<p class="card-page__info-text"><span>Бренд:</span> ${parameters.current.brand}</p>` : ``;
  const country = parameters.current.country ? `<p class="card-page__info-text"><span>Страна:</span> ${parameters.current.country}</p>` : ``;
  const style = parameters.current.style ? `<p class="card-page__info-text"><span>Стиль:</span> ${parameters.current.style}</p>` : ``;
  const material = parameters.current.materialBase ? `<p class="card-page__info-text"><span>Материал каркаса:</span> ${parameters.current.materialBase}</p>` : ``;
  const materialUp = parameters.current.materialUp ? `<p class="card-page__info-text"><span>Материал сиденья:</span> ${parameters.current.materialUp}</p>` : ``;
  const colorUp = parameters.current.colorUp ? `<p class="card-page__info-text"><span>Цвет сиденья:</span> ${parameters.current.colorUp}</p>` : ``;
  const room = parameters.current.room ? `<p class="card-page__info-text"><span>В какую комнату:</span> ${parameters.current.room}</p>` : ``;
  const typeUp = parameters.current.typeUp ? `<p class="card-page__info-text"><span>Тип сиденья:</span> ${parameters.current.typeUp}</p>` : ``;

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
          <p class="card-page__info-text card-page__info-text--price" style="margin-bottom: 20px">
            <span>Цена:</span> ${getPrice(price)} ₽
          </p>
            ${brand}
            ${country}
            ${material}
            ${materialUp}
            ${style}
            ${colorUp}
            ${room}
            ${typeUp}
          <a class="card-page__buy-btn" href="" style="margin-top: 20px">Купить</a>
        </div>
      </div>
      <div class="card-page__description">
        <h2>Описание:</h2>
        ${description}
      </div>
    </section>`
  );
};

class CardChairPage extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {

    return createCardPage(this._card);
  }
}

export default CardChairPage;
