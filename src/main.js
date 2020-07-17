import {load, loadData, loadDataToFurniture, loadDataToLight, loadDataToChairs} from "./load/load";
import {loadDataToProduct} from "./load/load-card-page";
import {LOCAL_CHAIRS, LOCAL_FURNITURE, LOCAL_LIGHT} from "./utils/consts";
import {loadDecorCard} from "./load/load-card";
import {initBasket} from "./utils/basket";

if (document.querySelector(`.decor-js`)) {
  loadData();
}

if (document.querySelector(`.product`)) {
  loadDecorCard();
}

if (document.querySelector(`.light-js`)) {
  load(loadDataToLight, LOCAL_LIGHT);
}

if (document.querySelector(`.product-light`)) {
  load(loadDataToProduct, LOCAL_LIGHT, `light`);
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
