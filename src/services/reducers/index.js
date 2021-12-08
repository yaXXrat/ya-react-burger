import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { constructorReducer } from "./constructor";
import { errorReducer } from "./error";
import { burgerIngredientsReducer } from "./ingredients";
import { burgerIngredientReducer } from "./ingredient";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerIngredient: burgerIngredientReducer,
    orderConstructor: constructorReducer,
    order: orderReducer,
    errorInfo: errorReducer,
});
