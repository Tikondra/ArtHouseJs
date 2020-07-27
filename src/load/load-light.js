import {renderLoad} from "../render/render-load";
import {parseCategoriesLight, parseDataLight} from "../utils/parse";
import {sorting} from "../utils/sorting";
import {preloader} from "../utils/utils";
import OffersModel from "../models/offers";
import FilterControllerLight from "../controllers/filter-controller-light";
import CardLightComponent from "../components/light-card";

const sortSelect = document.querySelector(`.store-content__sort-select`);

export const loadDataToLight = () => {
  const strGET = window.location.search.replace(`?`, ``);
  const offersModel = new OffersModel();
  const sqlStart = `start=0`;
  const sqlEnd = `end=5000`;
  const loadLight = fetch(`/wp-json/myplugin/v1/light?${sqlStart}&${sqlEnd}`);

  loadLight
    .then((response) => response.json())
    .then(parseDataLight)
    .then((offers) => offersModel.setOffers(offers))
    .then(() => fetch(`/wp-json/myplugin/v1/categorieslight`))
    .then((response) => response.json())
    .then(parseCategoriesLight)
    .then((categories) => renderLoad(strGET, categories, offersModel, CardLightComponent, `svet`))
    .then(() => sortSelect.addEventListener(`change`, (evt) => {
      sorting(evt, offersModel, CardLightComponent);
    }))
    .then(() => {
      const filterController = new FilterControllerLight(offersModel, CardLightComponent);
      filterController.render();
    })
    .then(preloader)
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
};
