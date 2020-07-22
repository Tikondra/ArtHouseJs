import {load, loadData, loadDataToFurniture, loadDataToChairs} from "./load/load";
import {loadDataToLight} from "./load/load-light";
import {loadDataToProduct} from "./load/load-card-page";
import {LOCAL_CHAIRS, LOCAL_FURNITURE} from "./utils/consts";
import {loadDecorCard} from "./load/load-card";
import {initBasket} from "./utils/basket";
import {loadLightCardPage} from "./load/load-card-light-page";

if (document.querySelector(`.decor-js`)) {
  loadData();
}

if (document.querySelector(`.product`)) {
  loadDecorCard();
}

if (document.querySelector(`.light-js`)) {
  loadDataToLight();
}

if (document.querySelector(`.product-light`)) {
  loadLightCardPage();
}

if (document.querySelector(`.furniture-js`)) {
  load(loadDataToFurniture, LOCAL_FURNITURE);
}

if (document.querySelector(`.product-furniture`)) {
  load(loadDataToProduct, LOCAL_FURNITURE, `furniture`, true);
}

if (document.querySelector(`.chairs-js`)) {
  load(loadDataToChairs, LOCAL_CHAIRS);
}

if (document.querySelector(`.product-chair`)) {
  load(loadDataToProduct, LOCAL_CHAIRS, `chair`, true);
}

initBasket();

const search = document.querySelector(`.search`);

search.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  const getData = search.querySelector(`.search__input`).value;
  const getSearchItems = fetch(`/wp-json/myplugin/v1/search/${getData}`);

  getSearchItems
    .then((response) => response.json())
    .then((res) => console.log(res));
});
