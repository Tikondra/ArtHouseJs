import AbstractComponent from "./AbstractComponent";
import {createImg} from "./card-page-img";

const createCardPage = (card) => {

  const {parameters, title, description, image} = card;
  console.log(parameters)
  const getImages = (pictures) => pictures.map((it) => createImg(it)).join(`\n`);

  const getParameterMarkup = (params) => {
    return params.map((it) => {
      return (
        `<p class="card-page__info-text"><span>${it.title}:</span> ${it.value}</p>`
      );
    }).join(`\n`);
  };

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
        <ul class="card-page__list owl-carousel">
          ${getImages(image)}
        </ul>
        <div class="card-page__info">
          <p class="card-page__info-text card-page__info-text--price" style="margin-bottom: 20px">
            <span>Цена:</span> ${Math.floor(parameters.current.price)} ₽
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