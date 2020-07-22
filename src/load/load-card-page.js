import {getOffersFurniture} from "../utils/offers";
import {getFurnitureParameters} from "../utils/categories";
import {getCard} from "./load-card";
import {TypeCard, FilterType} from "../utils/consts";

export const loadDataToProduct = (data, type, parameters) => {
  let dataOffers = data.КоммерческаяИнформация.Каталог.Товары.Товар;

  let dataParameters = parameters;
  if (parameters) {
    dataParameters = getFurnitureParameters(data.КоммерческаяИнформация.Классификатор.Свойства.Свойство);
  }
  let strGET = window.location.search.replace(`?`, ``);
  let pageTitle = document.querySelector(`title`);
  let offersProduct;

  switch (type) {
    case TypeCard.FURNITURE:
      offersProduct = getOffersFurniture(dataOffers, dataParameters, FilterType.FURNITURE);
      break;
    case TypeCard.CHAIR:
      offersProduct = getOffersFurniture(dataOffers, dataParameters, FilterType.CHAIRS);
      break;
  }

  getCard(offersProduct, strGET, type, pageTitle);

  // eslint-disable-next-line no-undef
  $(document).ready(function () {
    // eslint-disable-next-line no-undef
    $(`.owl-carousel`).owlCarousel({
      items: 1,
      dots: false,
      nav: true
    });
  });

  // eslint-disable-next-line no-undef
  $(`.gallery-item`).magnificPopup({
    type: `image`,
    gallery: {
      enabled: true
    }
  });
};
