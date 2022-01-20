export type TMenuItem = {
    itemDest: string,
    Icon: any,
    itemText: string
}

export type TIngredient = {
    name: string,
    price: number,
    image: string,
    _id: number,
    type?: string,
    image_mobile?: string,
    image_large?: string,
    calories?: number,
    proteins?: number,
    fat?: number,
    carbohydrates?: number
}

export type TBurgerIngredient = {
    ingredient: TIngredient,
    className: string,
    selectedCount: number
}

export type TBurgerIngredientGroup = {
    title: string,
    ingredients: Array<TIngredient>,
}

export type TGroup = {
    type: string,
    title: string,
}
