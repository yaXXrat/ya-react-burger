import { REMOVE_ORDER_INGREDIENT, SET_ORDER_INGREDIENT, UPDATE_INGREDIENTS_ORDER, ERASE_INGREDIENTS_ORDER } from '../constants/constructor';
import {TBurgerConstructorItem, TIngredient} from '../types/types'
import { TConstructorActions } from '../actions/constructor'

type TConstructorState = {
    lastIndex: number,
    constructorBun: TIngredient | undefined,
    constructorIngredients: Array<TBurgerConstructorItem>
}

export const initialState: TConstructorState = {
    lastIndex: 0,
    constructorBun: undefined,
    constructorIngredients: [],
};

export const constructorReducer = (state = initialState, action: TConstructorActions) => {
    switch (action.type) {
        case SET_ORDER_INGREDIENT:
            let newState = undefined;
            if( action.ingredient.type === "bun") {
                newState = {
                    ...state,
                    constructorBun: {ingredient: action.ingredient}
                }
            } else {
                let tmpIndex = state.lastIndex + 1;
                let newIngredient: TBurgerConstructorItem = {ingredient: action.ingredient, index: tmpIndex, id: state.constructorIngredients.length};
                newIngredient.index = tmpIndex;
                newState = {
                    ...state,
                    lastIndex: tmpIndex,
                    constructorIngredients: [
                        ...state.constructorIngredients,
                        newIngredient
                    ]
                }
            }
            return newState;
        case REMOVE_ORDER_INGREDIENT:
            const newIngredients = [...state.constructorIngredients];
            let idx = newIngredients.indexOf(action.item);
            newIngredients.splice(idx, 1);            
            return {
                ...state,
                constructorIngredients: newIngredients
            };
        case UPDATE_INGREDIENTS_ORDER:
            let temp = [...state.constructorIngredients];
            [temp[action.dragIndex], temp[action.hoverIndex]] = [ temp[action.hoverIndex], temp[action.dragIndex]];
            return {
                ...state,
                constructorIngredients: [...temp]
            };
        case ERASE_INGREDIENTS_ORDER:
            return {
                ...initialState
            };
        default: return state;
    }
}


