import {load, loadData, loadDataToFurniture, loadDataToLight, loadDataToProduct} from "./load/load";
import {LOCAL_DECOR, LOCAL_FURNITURE, LOCAL_LIGHT} from "./components/consts";

if (document.querySelector(`.decor-js`)) {
  load(loadData, LOCAL_DECOR);
}

if (document.querySelector(`.product`)) {
  load(loadDataToProduct, LOCAL_DECOR, `decor`);
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
