export type TMenuItem = {
    itemDest: string,
    Icon: any,
    itemText: string
}

export type TIngredient = {
    name: string,
    price: number,
    image: any,
    type?: string,
    _id: number
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
