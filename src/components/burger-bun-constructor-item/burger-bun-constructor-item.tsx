import React, { FC } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TBurgerBun } from '../../services/types/types'

const BurgerBunConstructorItem: FC<TBurgerBun> = ( { type, ingredient }) => {
    const suffix = (type==="top" ? ' (верх)' : ' (низ)');
    return (<>
            <ConstructorElement
                type={type}
                isLocked={true}
                text={ingredient.name + suffix}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
            />
            </>
        );
  };

  export default BurgerBunConstructorItem;
