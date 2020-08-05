import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../store";
import {Operation as SearchOperation} from "../reducer/search/data";
import SearchList from "../components/search-list/search-list.jsx";

export const initSearch = () => {
  const search = document.querySelector(`.search`);

  search.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    const getData = search.querySelector(`.search__input`).value;

    if (getData) {
      document.location.href = `quest?${getData}`;
    }
  });

  if (document.querySelector(`#search`)) {
    let strGET = window.location.search.replace(`?`, ``);
    const searchRequest = decodeURI(strGET).split(` `);

    store.dispatch(SearchOperation.loadSearchOffers(searchRequest));

    ReactDOM.render(
        <Provider store={store}>
          <SearchList/>
        </Provider>,
        document.querySelector(`#search`)
    );
  }
};
