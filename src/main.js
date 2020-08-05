import {load, loadData, loadDataToFurniture, loadDataToChairs} from "./load/load";
import {loadDataToLight} from "./load/load-light";
import {loadDataToProduct} from "./load/load-card-page";
import {loadDecorCard} from "./load/load-card";
import {initBasket} from "./utils/basket";
import {loadLightCardPage} from "./load/load-card-light-page";
import {LOCAL_CHAIRS2, LOCAL_FURNITURE2} from "./utils/consts";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import App from "./components/app/app.jsx";
import {Operation as LightOperation} from "./reducer/light/data";
import {initSearch} from "./utils/search";

if (document.querySelector(`#root`)) {
  store.dispatch(LightOperation.loadStartOffers());
  store.dispatch(LightOperation.loadFilters());
  store.dispatch(LightOperation.loadCategories());

  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
}

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
  load(loadDataToFurniture, LOCAL_FURNITURE2);
}
if (document.querySelector(`.product-furniture`)) {
  load(loadDataToProduct, LOCAL_FURNITURE2, `furniture`, true);
}

if (document.querySelector(`.chairs-js`)) {
  load(loadDataToChairs, LOCAL_CHAIRS2);
}
if (document.querySelector(`.product-chair`)) {
  load(loadDataToProduct, LOCAL_CHAIRS2, `chair`, true);
}

initBasket();
initSearch();

