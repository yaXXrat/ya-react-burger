import {combineReducers} from "redux";
import { orderReducer } from "./orderReducer";
import {burgerIngredientsReducer} from "./reducers";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    orderIngredients: orderReducer,
});
