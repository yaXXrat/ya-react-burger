import {combineReducers} from "redux";
import { orderReducer } from "./order";
import { errorReducer } from "./error";
import {burgerIngredientsReducer} from "./ingredients";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    orderIngredients: orderReducer,
    errorInfo: errorReducer,
});
