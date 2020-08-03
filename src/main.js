import {load, loadData, loadDataToFurniture, loadDataToChairs} from "./load/load";
import {loadDataToLight} from "./load/load-light";
import {loadDataToProduct} from "./load/load-card-page";
import {loadDecorCard} from "./load/load-card";
import {initBasket} from "./utils/basket";
import {loadLightCardPage} from "./load/load-card-light-page";
import {LOCAL_CHAIRS, LOCAL_FURNITURE} from "./utils/consts";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import App from "./components/app/app.jsx";
import {Operation} from "./reducer/data";

if (document.querySelector(`#root`)) {
  store.dispatch(Operation.loadStartOffers());
  store.dispatch(Operation.loadFilters());
  store.dispatch(Operation.loadCategories());

  const init = () => {
    ReactDOM.render(
        <Provider store={store}>
          <App/>
        </Provider>,
        document.querySelector(`#root`)
    );
  };

  init();
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
  document.location.href = `https://arthouse-decor.ru/search/`;

  const getData = search.querySelector(`.search__input`).value;
  const getSearchItems = fetch(`/wp-json/myplugin/v1/search/${getData}`);

  getSearchItems
    .then((response) => response.json())
    // eslint-disable-next-line no-console
    .then((res) => console.log(res));
});
