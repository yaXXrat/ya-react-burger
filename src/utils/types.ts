import { ReactNode } from "react";

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
    image_mobile: string,
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

export type TBurgerBun = {
    type: 'top' | 'bottom' | undefined,
    ingredient: TIngredient,
}

export type TBurgerConstructorItem = {
    ingredient: TIngredient,
    id: number,
    index: number
    moveCard: (arg0: any, arg1: any) => void,
}

export type TResult = {
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
    message?: string;
  };

export type TOptions = {
    method: string;
    headers: { 'Content-Type': string; 'Authorization'?: string };
    body?: string;
  };

export type TProtectedRoute = {
    children: ReactNode;
    path: string;
  };

export type TModalOverlayProps = {
    onClose: () => void;
}

export type TModalProps = {
    children: ReactNode;
    onClose?: () => void;
    className?: string;
}

export type TOrder = {
    number: number;
    success: boolean;
    name: string;
    ingredients: TIngredient[];
    price: number;
}

export type TIngredientsIds = {
    ingredients: any;
}
