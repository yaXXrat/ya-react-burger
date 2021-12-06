import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { errorReducer } from "./error";
import { burgerIngredientsReducer } from "./ingredients";
import { burgerIngredientReducer } from "./ingredient";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerIngredient: burgerIngredientReducer,
    orderIngredients: orderReducer,
    errorInfo: errorReducer,
});
