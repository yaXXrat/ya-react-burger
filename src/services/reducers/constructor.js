import { REMOVE_ORDER_INGREDIENT, SET_ORDER_INGREDIENT, UPDATE_INGREDIENTS_ORDER } from '../actions/constructor';

export const initialState = {
    lastIndex: 0,
    constructorBun: undefined,
    constructorIngredients: [],
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_INGREDIENT:
            let newState = undefined;
            if(action.ingredient.type === "bun") {
                newState = {
                    ...state,
                    constructorBun: action.ingredient
                }
            } else {
                let newIngredient = {...action.ingredient};
                let tmpIndex = state.lastIndex + 1;
                newIngredient.id = tmpIndex;
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
            let idx = newIngredients.indexOf(action.ingredient);
            newIngredients.splice(idx, 1);            
            return {
                ...state,
                constructorIngredients: newIngredients
            }
            case UPDATE_INGREDIENTS_ORDER:
                let temp = [...state.constructorIngredients];
                [temp[action.dragIndex], temp[action.hoverIndex]] = [ temp[action.hoverIndex], temp[action.dragIndex]];
                return {
                    ...state,
                    constructorIngredients: [...temp]
                }
            default: return state;
    }
}


