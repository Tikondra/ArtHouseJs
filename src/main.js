import {load, loadData, loadDataToLight, loadDataToProduct} from "./load/load";
import {LOCAL_DECOR, LOCAL_LIGHT} from "./components/consts";

if (document.querySelector(`.decor-js`)) {
  load(loadData, LOCAL_DECOR);
}

if (document.querySelector(`.product`)) {
  load(loadDataToProduct, LOCAL_DECOR);
}

if (document.querySelector(`.light-js`)) {
  load(loadDataToLight, LOCAL_LIGHT);
}
