import OffersModel from "../models/offers";

export const loadDataToFurniture = () => {
  const strGET = window.location.search.replace(`?`, ``);
  const offersModel = new OffersModel();

  const loadFurniture = fetch(`/wp-json/myplugin/v1/chairs`);

  loadFurniture
    .then((response) => console.log(response.json()));
};
