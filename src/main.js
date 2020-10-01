import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import App from "./components/app/app.jsx";
import {Operation as LightOperation} from "./reducer/light/data";
import {loadData} from "./load/load";
import {loadDecorCard} from "./load/load-card";
import {loadLightCardPage} from "./load/load-card-light-page";
import {loadFurnitureOffer, loadFurnitureOffers} from "./load/load-furniture";
import {initSearch} from "./utils/search";
import {initBasket} from "./utils/basket";

// декор
if (document.querySelector(`.decor-js`)) {
  loadData();
}
if (document.querySelector(`.product`)) {
  loadDecorCard();
}
// свет
// if (document.querySelector(`.light-js`)) {
//   loadDataToLight();
// }
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
if (document.querySelector(`.product-light`)) {
  loadLightCardPage();
}
// столы
if (document.querySelector(`.furniture-js`)) {
  loadFurnitureOffers(1);
}
// стулья
if (document.querySelector(`.chairs-js`)) {
  loadFurnitureOffers(2);
}
// карточка столов и стульев
if (document.querySelector(`.product-furniture`)) {
  loadFurnitureOffer();
}

initBasket();
initSearch();

