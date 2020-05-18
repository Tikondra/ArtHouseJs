import AbstractComponent from "./AbstractComponent";

const createCardPage = (card) => {

  const {parameters, title, description, image} = card;

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
  const color = parameters.current.color ? `<p class="card-page__info-text"><span>Цвет:</span> ${parameters.current.color}</p>` : ``;
  const material = parameters.current.materialKarkas ? `<p class="card-page__info-text"><span>Материал каркаса:</span> ${parameters.current.materialKarkas}</p>` : ``;
  const materialUp = parameters.current.materialUp ? `<p class="card-page__info-text"><span>Материал столешницы:</span> ${parameters.current.materialUp}</p>` : ``;

  return (
    `<section class="card-page">
      <h1 class="card-page__title">
        ${title}
      </h1>
      <div class="card-page__info-box">
        <img src="${image}">
        <div class="card-page__info">
          <p class="card-page__info-text card-page__info-text--price">
            <span>Цена:</span> ${Math.floor(parameters.current.price)} ₽
          </p>
           ${country}
           ${brand}
           ${style}
           ${color}
           ${material}
           ${materialUp}
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
