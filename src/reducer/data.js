import {parseDataLight} from "../utils/parse";
import {extend} from "../utils/utils";

const initialState = {
  offers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    const sqlStart = `start=0`;
    const sqlEnd = `end=2000`;
    return api.get(`/light?${sqlStart}&${sqlEnd}`)
      .then((response) => response.json())
      .then(parseDataLight)
      .then((offers) => dispatch(ActionCreator.loadOffers(offers)));
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
