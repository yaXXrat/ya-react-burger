import React from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import {ingredientPT} from '../../utils/proptypes';
import PropTypes from "prop-types";

const BurgerBunConstructorItem = ( { type, ingredient }) => {
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
  BurgerBunConstructorItem.propTypes = {
    ingredient: ingredientPT.isRequired,
    type: PropTypes.string.isRequired,
  };

  export default BurgerBunConstructorItem;
