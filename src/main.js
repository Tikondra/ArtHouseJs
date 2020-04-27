import {load, loadData, loadDataToProduct} from "./load/load";
import {LOCAL_DECOR} from "./components/consts";

if (document.querySelector(`.store-content`)) {
  load(loadData, LOCAL_DECOR);
}

if (document.querySelector(`.product`)) {
  load(loadDataToProduct, LOCAL_DECOR);
}
