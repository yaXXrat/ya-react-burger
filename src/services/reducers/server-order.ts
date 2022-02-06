import type { TLoadOrderFromServerActions } from '../actions/server-order';
import type { TOrdersActions } from '../actions/orders';

import { LOAD_INGREDIENTS } from '../constants/orders';
import {
    LOAD_ORDER_FROM_SERVER_SUCCESS,    
//    LOAD_ORDER_FROM_SERVER,
    SET_ORDER_LOCAL
} from '../constants/server-order';

import { TFeedOrder, STATUS } from "../types/orders";
import { TIngredient } from '../types/types';

export type TServerOrderState = {
    currentOrder: TFeedOrder,
    ingredientPrices: Map<string, number>,
    isLoaded: boolean
  } 

export const initialState: TServerOrderState = {
    currentOrder: {
        id: 0,
        _id: '',
        createdAt: '',
        fullname: '',
        status: STATUS.PENDING,
        ingredients:[],
        total: 0
    },
    ingredientPrices: new Map(),
    isLoaded: false
};

export const serverOrderReducer = (state = initialState, action: TLoadOrderFromServerActions | TOrdersActions) => {
    switch (action.type) {
        case LOAD_INGREDIENTS:
            let ingredientPrices: Map<string, number> = new Map();
            let ingredients: ReadonlyArray<TIngredient> = action.ingredients;
            ingredients.forEach((ingredient: TIngredient) => {
                ingredientPrices.set(ingredient._id, ingredient.price);

            })
            return { 
                ...state,
                ingredientPrices: ingredientPrices
            }
        case SET_ORDER_LOCAL:
            return {
                ...state,
                currentOrder: action.payload,
                isLoaded: true
            }
        case LOAD_ORDER_FROM_SERVER_SUCCESS:
            let ingredientIds: ReadonlyArray<string> = action.payload.ingredients;
            let total: number = 0;
            ingredientIds.forEach((id: string) =>{
                let ingredientPrice: number | undefined = state.ingredientPrices.get(id);
                total += ( typeof ingredientPrice == 'undefined') ? 0 : ingredientPrice;
            })
            let newOrder: TFeedOrder = {
                id: action.payload.id,
                _id: action.payload._id,
                createdAt: action.payload.createdAt,
                fullname: action.payload.fullname,
                ingredients: ingredientIds,
                status: action.payload.status,
                total: total
            }
            return {
                ...state,
                currentOrder: newOrder,
                isLoaded: true
            }
        default: return state;
    }
}


