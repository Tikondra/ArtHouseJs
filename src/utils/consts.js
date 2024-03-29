export const START_SHOW_TASK = 9;
export const MORE_SHOW_TASK = 6;
export const API_DECOR = `https://garda-opt.ru/bitrix/catalog_export/garda_decor.php`;
export const LOCAL_DECOR = `./data/decor.xml`;
export const LOCAL_LIGHT = `./data/test.xml`;
export const LOCAL_FURNITURE = `./data/stoly.xml`;
export const LOCAL_CHAIRS = `./data/stulya.xml`;

export const Place = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const TypeCard = {
  DECOR: `decor`,
  LIGHT: `light`,
  FURNITURE: `furniture`,
  CHAIR: `chair`
};

export const Filter = {
  COUNTRY: `Страна`,
  VENDOR: `Бренд`
};

export const FILTERS = Object.values(Filter);

export const FilterType = {
  LIGHT: `light`,
  FURNITURE: `furniture`,
  CHAIRS: `chairs`
};

export const SortType = {
  DEFAULT: `default`,
  PRICE_UP: `price-up`,
  PRICE_DOWN: `price-down`
};
