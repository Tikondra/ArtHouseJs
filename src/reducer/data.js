import {parseCategoriesLight, parseDataLight, parseFiltersLight} from "../utils/parse";
import {extend, preloader} from "../utils/utils";

const initialState = {
  offers: [],
  categories: [],
  filters: [],
  showingOffers: 9,
  isShowCategories: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_MORE_OFFERS: `LOAD_MORE_OFFERS`,
  MORE_VIEW: `MORE_VIEW`,
  LOAD_CATEGORIES: `LOAD_CATEGORIES`,
  LOAD_FILTERS: `LOAD_FILTERS`,
  SHOW_CATEGORIES: `SHOW_CATEGORIES`
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },

  loadMoreOffers: (offers) => {
    return {
      type: ActionType.LOAD_MORE_OFFERS,
      payload: offers,
    };
  },

  loadCategories: (categories) => {
    return {
      type: ActionType.LOAD_CATEGORIES,
      payload: categories
    };
  },

  loadFilters: (filters) => {
    return {
      type: ActionType.LOAD_FILTERS,
      payload: filters
    };
  },

  moreView: () => {
    return {
      type: ActionType.MORE_VIEW,
      payload: 3
    };
  },

  moreViewCategories: (state) => {
    return {
      type: ActionType.SHOW_CATEGORIES,
      payload: !state,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    const offersCount = getState().offers.length;
    const sqlStart = `start=${offersCount}`;
    const sqlEnd = `end=3`;
    return api.get(`/light?${sqlStart}&${sqlEnd}`)
      .then((response) => parseDataLight(response.data))
      .then((offers) => dispatch(ActionCreator.loadMoreOffers(offers)));
  },

  loadStartOffers: () => (dispatch, getState, api) => {
    const sqlStart = `start=0`;
    const sqlEnd = `end=12`;
    return api.get(`/light?${sqlStart}&${sqlEnd}`)
      .then((response) => parseDataLight(response.data))
      .then((offers) => dispatch(ActionCreator.loadOffers(offers)))
      .then(preloader);
  },

  loadCategories: () => (dispatch, getState, api) => {
    return api.get(`/categorieslight`)
      .then((response) => parseCategoriesLight(response.data))
      .then((categories) => dispatch(ActionCreator.loadCategories(categories)));
  },

  loadFilters: () => (dispatch, getState, api) => {
    return api.get(`/filterslight`)
      .then((response) => parseFiltersLight(response.data))
      .then((filters) => dispatch(ActionCreator.loadFilters(filters)));
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.LOAD_MORE_OFFERS:
      return extend(state, {
        offers: [...state.offers, ...action.payload],
      });

    case ActionType.MORE_VIEW:
      return extend(state, {
        showingOffers: state.showingOffers + action.payload,
      });

    case ActionType.LOAD_FILTERS:
      return extend(state, {
        filters: action.payload,
      });

    case ActionType.LOAD_CATEGORIES:
      return extend(state, {
        categories: action.payload,
      });

    case ActionType.SHOW_CATEGORIES:
      return extend(state, {
        isShowCategories: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
