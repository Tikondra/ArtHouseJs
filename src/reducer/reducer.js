import {combineReducers} from "redux";
import {reducer as light} from "./light/data";
import {reducer as search} from "./search/data";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.LIGHT]: light,
  [NameSpace.SEARCH]: search,
});
