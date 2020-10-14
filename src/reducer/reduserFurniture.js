import {combineReducers} from "redux";
import {reducer as tables} from "./tables/reducer";
import {reducer as search} from "./search/data";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.TABLES]: tables,
  [NameSpace.SEARCH]: search,
});
