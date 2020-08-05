import {extend} from "../../utils/utils";
import {parseData} from "../../utils/parse";
import NameSpace from "../name-space";

const initialState = {
  searchOffers: [],
  showSearchOffers: 0,
  searchRequest: [],
};

const ActionType = {
  LOAD_SEARCH_RESULT: `LOAD_SEARCH_RESULT`,
  LOAD_MORE_SEARCH_RESULT: `LOAD_MORE_SEARCH_RESULT`,
  MORE_VIEW_SEARCH_RESULT: `MORE_VIEW_SEARCH_RESULT`,
  CHANGE_SEARCH_REQUEST: `CHANGE_SEARCH_REQUEST`,
};

const ActionCreator = {
  loadOffersSearch: (offers) => {
    return {
      type: ActionType.LOAD_SEARCH_RESULT,
      payload: offers,
    };
  },

  loadMoreSearchOffers: (offers) => {
    return {
      type: ActionType.LOAD_MORE_SEARCH_RESULT,
      payload: offers,
    };
  },

  moreViewSearch: () => {
    return {
      type: ActionType.MORE_VIEW_SEARCH_RESULT,
      payload: 3
    };
  },

  changeSearchRequest: (request) => {
    return {
      type: ActionType.CHANGE_SEARCH_REQUEST,
      payload: request
    };
  },
};

const Operation = {
  loadMoreSearchOffers: (request) => (dispatch, getState, api) => {
    const offersCount = getState()[NameSpace.SEARCH].searchOffers.length;
    const sqlStart = `start=${offersCount}`;
    const sqlEnd = `end=3`;
    const searchRequest = `search=${request[0]}`;
    const from = `from=wp_tovarsgarda`;
    const where = `where=title`;

    return api.get(`/search?${sqlStart}&${sqlEnd}&${searchRequest}&${from}&${where}`)
      .then((response) => parseData(response.data))
      .then((offers) => dispatch(ActionCreator.loadMoreSearchOffers(offers)));
  },

  loadSearchOffers: (request) => (dispatch, getState, api) => {
    const sqlStart = `start=0`;
    const sqlEnd = `end=12`;
    const searchRequest = `search=${request[0]}`;
    const from = `from=wp_tovarsgarda`;
    const where = `where=title`;

    if (request[0].length > 0) {
      return api.get(`/search?${sqlStart}&${sqlEnd}&${searchRequest}&${from}&${where}`)
        .then((response) => parseData(response.data))
        .then((offers) => {
          dispatch(ActionCreator.loadOffersSearch(offers));
          dispatch(ActionCreator.changeSearchRequest(request));
        });
    }

    return () => {
      dispatch(ActionCreator.loadOffersSearch([]));
      dispatch(ActionCreator.changeSearchRequest([]));
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_SEARCH_RESULT:
      return extend(state, {
        searchOffers: action.payload,
        showSearchOffers: action.payload.length < 9 ? action.payload.length : 9,
      });

    case ActionType.LOAD_MORE_SEARCH_RESULT:
      return extend(state, {
        searchOffers: [...state.searchOffers, ...action.payload],
      });

    case ActionType.MORE_VIEW_SEARCH_RESULT:
      return extend(state, {
        showSearchOffers: state.showSearchOffers + action.payload,
      });

    case ActionType.CHANGE_SEARCH_REQUEST:
      return extend(state, {
        searchRequest: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
