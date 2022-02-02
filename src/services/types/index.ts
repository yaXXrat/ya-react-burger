import { store } from '../store';
import {AuthReducer} from '../reducers/auth';
import {burgerIngredientsReducer} from "../reducers/ingredients";
import {burgerIngredientReducer} from "../reducers/ingredient";
import {constructorReducer} from "../reducers/constructor";
import {orderReducer} from "../reducers/order";
import {errorReducer} from "../reducers/error";

export type AppDispatch = typeof store.dispatch;
export type RootState = {
    burgerIngredients: typeof burgerIngredientsReducer;
    burgerIngredient: typeof burgerIngredientReducer;
    orderConstructor: typeof constructorReducer;
    order: typeof orderReducer;
    errorInfo: typeof errorReducer;
    auth: typeof AuthReducer;
};




