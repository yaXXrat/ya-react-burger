export type TFeedOrder = {
    id: number;
    createdAt: string;
    fullname: string;
    status: STATUS;
    ingredientIds: TIngredientIds;
};

export type TIngredientIds = ReadonlyArray<string>;

export enum STATUS {
    DONE = 'done',
    CREATED = 'created',
    CANCELLED = 'cancelled',
    PENDING = 'pending'
};

export type IServerOrder = {
    createdAt: string,
    updatedAt: string,
    number: number,
    _id: string,
    ingredients: TIngredientIds
    status: STATUS,
    name: string
}

export type IServerOrderReply = {
    orders: ReadonlyArray<IServerOrder>,
    total: number,
    totalToday: number
};

export type TOrders = ReadonlyArray<TFeedOrder>;
