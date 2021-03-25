import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { determinated } from "./modules/clicked/reducer";

const reducers = combineReducers({
    clicked: determinated,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
