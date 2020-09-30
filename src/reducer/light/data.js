import {parseCategoriesLight, parseDataLight, parseFiltersLight} from "../../utils/parse";
import {extend, preloader} from "../../utils/utils";
import NameSpace from "../name-space";

const initialState = {
  offers: [],
  categories: [],
  filters: [],
  showingOffers: 9,
  activeCategory: null,
  request: [],
  sortType: null,
  isShowCategories: false,
  isShowFilter: false,
};

const getFetchConfig = (id = ``, request = [], sortType = ``, sqlStart, sqlEnd) => {
  let sqlRequest = ``;
  if (request.length > 0) {
    request.map((it) => {
      sqlRequest += `AND \`param\` LIKE "%${it}%" `;
    });
  }

  let category = id ? `&category=AND \`categoryId\` = ${id}` : ``;
  let typeSort = sortType ? `&sort=ORDER BY \`price\` ${sortType}` : ``;
  let sorting = request.length > 0 ? `&sorting=${sqlRequest}` : ``;

  return `/light?${sqlStart}&${sqlEnd}${category}${sorting}${typeSort}`;
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_MORE_OFFERS: `LOAD_MORE_OFFERS`,
  MORE_VIEW: `MORE_VIEW`,
  LOAD_CATEGORIES: `LOAD_CATEGORIES`,
  LOAD_FILTERS: `LOAD_FILTERS`,
  SHOW_CATEGORIES: `SHOW_CATEGORIES`,
  SHOW_FILTER: `SHOW_FILTER`,
  CHANGE_ACTIVE_CATEGORY: `CHANGE_ACTIVE_CATEGORY`,
  CHANGE_REQUEST: `CHANGE_REQUEST`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  RESET_FILTERS: `RESET_FILTERS`,
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

  showFilter: (state) => {
    return {
      type: ActionType.SHOW_FILTER,
      payload: !state,
    };
  },

  changeActiveCategory: (categoryId) => {
    return {
      type: ActionType.CHANGE_ACTIVE_CATEGORY,
      payload: categoryId,
    };
  },

  changeRequest: (activeFilter) => {
    return {
      type: ActionType.CHANGE_REQUEST,
      payload: activeFilter
    };
  },

  changeSortType: (sortType) => {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: sortType,
    };
  },

  resetFilters: () => {
    return {
      type: ActionType.RESET_FILTERS,
      payload: true,
    };
  }
};

const Operation = {
  loadOffers: (id, request, sortType) => (dispatch, getState, api) => {
    const offersCount = getState()[NameSpace.LIGHT].offers.length;
    const sqlStart = `start=${offersCount}`;
    const sqlEnd = `end=3`;

    const fetch = getFetchConfig(id, request, sortType, sqlStart, sqlEnd);

    return api.get(fetch)
      .then((response) => parseDataLight(response.data))
      .then((offers) => dispatch(ActionCreator.loadMoreOffers(offers)));
  },

  loadStartOffers: (id, request, sortType) => (dispatch, getState, api) => {
    const sqlStart = `start=0`;
    const sqlEnd = `end=12`;

    const fetch = getFetchConfig(id, request, sortType, sqlStart, sqlEnd);

    return api.get(fetch)
      .then((response) => parseDataLight(response.data))
      .then((offers) => {
        dispatch(ActionCreator.loadOffers(offers));
        if (id) {
          dispatch(ActionCreator.changeActiveCategory(id));
        }

        if (request) {
          dispatch(ActionCreator.changeRequest(request));
        }

        if (sortType) {
          dispatch(ActionCreator.changeSortType(sortType));
        } else {
          dispatch(ActionCreator.changeSortType(null));
        }
      })
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
        showingOffers: 9,
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

    case ActionType.SHOW_FILTER:
      return extend(state, {
        isShowFilter: action.payload,
      });

    case ActionType.CHANGE_ACTIVE_CATEGORY:
      return extend(state, {
        activeCategory: action.payload,
      });

    case ActionType.CHANGE_REQUEST:
      return extend(state, {
        request: action.payload,
      });

    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });

    case ActionType.RESET_FILTERS:
      return extend(state, {
        activeCategory: null,
        request: [],
        sortType: null,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
