import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { constructorReducer } from "./constructor";
import { errorReducer } from "./error";
import { burgerIngredientsReducer } from "./ingredients";
import { burgerIngredientReducer } from "./ingredient";
import { AuthReducer } from "./auth";
import { wsReducer } from "./websocket";
import { ordersReducer } from "./orders";
import { serverOrderReducer } from "./server-order";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerIngredient: burgerIngredientReducer,
    orderConstructor: constructorReducer,
    order: orderReducer,
    errorInfo: errorReducer,
    auth: AuthReducer,
    ws: wsReducer,
    orders: ordersReducer,
    serverOrder: serverOrderReducer
});
