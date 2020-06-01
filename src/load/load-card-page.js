import {getOffersFurniture, getOffersLight, getOffers} from "../components/offers";
import {getFurnitureParameters} from "../components/categories";
import {getCard} from "./load-card";
import {TypeCard, FilterType} from "../components/consts";

export const loadDataToProduct = (data, type, parameters) => {
  let dataOffers;
  if (type === TypeCard.DECOR || type === TypeCard.LIGHT) {
    dataOffers = data.yml_catalog.shop.offers.offer;
  } else {
    dataOffers = data.КоммерческаяИнформация.Каталог.Товары.Товар;
  }

  let dataParameters = parameters;
  if (parameters) {
    dataParameters = getFurnitureParameters(data.КоммерческаяИнформация.Классификатор.Свойства.Свойство);
  }
  let strGET = window.location.search.replace(`?`, ``);
  let pageTitle = document.querySelector(`title`);
  let offersProduct;

  switch (type) {
    case TypeCard.DECOR:
      offersProduct = getOffers(dataOffers);
      break;
    case TypeCard.LIGHT:
      offersProduct = getOffersLight(dataOffers);
      break;
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
