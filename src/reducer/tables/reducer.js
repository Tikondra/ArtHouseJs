import {parseFurniture} from "../../utils/parse";
import {extend, preloader} from "../../utils/utils";
import {ChairsCategories, FurnitureCategories} from "../../utils/consts";
import {sortingReact} from "../../utils/sorting";
import {getFiltersByFurniture, getSortedOffersByFurniture} from "../../utils/filters";

const initialState = {
  offers: [],
  sortedOffers: [],
  filters: [],
  categories: [],
  sortType: `price-up`,
  activeCategory: 0,
  request: [],
  isShowFilter: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FILTERS: `LOAD_FILTERS`,
  LOAD_CATEGORIES: `LOAD_CATEGORIES`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ACTIVE_CATEGORY: `CHANGE_ACTIVE_CATEGORY`,
  RESET_FILTERS: `RESET_FILTERS`,
  SHOW_FILTER: `SHOW_FILTER`,
  SET_FILTERS: `SET_FILTERS`,
  RESET_SORTING: `RESET_SORTING`
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  loadFilters: (filters) => {
    return {
      type: ActionType.LOAD_FILTERS,
      payload: filters
    };
  },
  loadCategories: (categoryId) => {
    return {
      type: ActionType.LOAD_CATEGORIES,
      payload: categoryId === 1 ? FurnitureCategories : ChairsCategories,
    };
  },
  changeSortType: (sortType) => {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: sortType,
    };
  },
  changeActiveCategory: (categoryId) => {
    return {
      type: ActionType.CHANGE_ACTIVE_CATEGORY,
      payload: categoryId,
    };
  },
  resetFilters: () => {
    return {
      type: ActionType.RESET_FILTERS,
    };
  },
  showFilter: (state) => {
    return {
      type: ActionType.SHOW_FILTER,
      payload: !state,
    };
  },
  setFilters: (offers) => {
    return {
      type: ActionType.SET_FILTERS,
      payload: offers
    };
  },
  resetSorting: () => {
    return {
      type: ActionType.RESET_SORTING
    };
  }
};

const Operation = {
  loadOffers: (categoryId) => (dispatch, getState, api) => {
    return api.get(`/furniture?category=WHERE \`category_id\` = ${categoryId}`)
      .then((response) => parseFurniture(response.data))
      .then((offers) => {
        dispatch(ActionCreator.loadOffers(offers));
        dispatch(ActionCreator.loadFilters(getFiltersByFurniture(offers)));
        dispatch(ActionCreator.loadCategories(categoryId));
      })
      .then(preloader);
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: sortingReact(action.payload, state.sortType),
      });

    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
        offers: sortingReact(state.offers, action.payload),
        sortedOffers: sortingReact(state.sortedOffers, action.payload)
      });

    case ActionType.CHANGE_ACTIVE_CATEGORY:
      return extend(state, {
        activeCategory: action.payload,
      });

    case ActionType.RESET_FILTERS:
      return extend(state, {
        activeCategory: initialState.activeCategory,
        request: initialState.request,
        sortType: initialState.sortType,
        sortedOffers: [],
      });

    case ActionType.RESET_SORTING:
      return extend(state, {
        sortedOffers: [],
      });

    case ActionType.LOAD_FILTERS:
      return extend(state, {
        filters: action.payload,
      });

    case ActionType.LOAD_CATEGORIES:
      return extend(state, {
        categories: action.payload,
      });

    case ActionType.SHOW_FILTER:
      return extend(state, {
        isShowFilter: action.payload,
      });

    case ActionType.SET_FILTERS:
      return extend(state, {
        sortedOffers: getSortedOffersByFurniture(action.payload)
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
