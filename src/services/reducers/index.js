import {combineReducers} from "redux";
import {burgerIngredientsReducer} from "./reducers";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
});
