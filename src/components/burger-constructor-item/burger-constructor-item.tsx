import React, { FC } from 'react'
import { useDispatch } from "react-redux";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { REMOVE_ORDER_INGREDIENT } from '../../services/actions/order';

import style from './burger-constructor-item.module.css';

import { useDrag, useDrop} from 'react-dnd';
import { useRef } from 'react';

import { TBurgerConstructorItem } from "../../utils/types";

const ItemTypes = {
    CARD: 'card',
}

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ( { ingredient, id, index, moveCard }) => {
    const dispatch = useDispatch();
    const removeConstructorItem = () => {
        dispatch({type: REMOVE_ORDER_INGREDIENT, ingredient: ingredient})
    }

    const ref = useRef<HTMLInputElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: TBurgerConstructorItem, monitor) {

                if (!ref.current) {
                    return;
                }
                const dragIndex = item.index;
                const hoverIndex = index;
                if (dragIndex === hoverIndex) {
                    return;
                }
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY = clientOffset!!.y - hoverBoundingRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                moveCard(dragIndex, hoverIndex);
                item.index = hoverIndex;

        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));


    return (<div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId} className={style.draggable}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    handleClose={removeConstructorItem}
                />    
            </div>
        );
  };

  export default BurgerConstructorItem;
