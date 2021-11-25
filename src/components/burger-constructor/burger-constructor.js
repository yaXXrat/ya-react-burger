import React, {useContext} from 'react';
import style from './burger-constructor.module.css';
import {ConstructorElement, DragIcon,  Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { SelectedDataContext } from '../../services/selected-data-context.js';

import PropTypes from "prop-types";

const CREATE_ORDER_URL = "https://norma.nomoreparties.space/api/orders222";

const BurgerConstructor = ({ displayOrderInfo, createOrder, setErrorText, setDisplayErrorOpen }) => {

    const selected = useContext(SelectedDataContext);

    const calcTotalPrice = (ingredients) => ingredients.reduce((acc, current) => acc + current.price, 0);
    let totalPrice = calcTotalPrice(selected)

    function makeOrder() {
        const data = {"ingredients": selected.map(item => item._id)};
        fetch(CREATE_ORDER_URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Error happened during data fetching while order creation!");
            }
          })
          .then((results) => {
            if(results.success){
                createOrder(results.order);
                displayOrderInfo()
            }else{
                throw new Error("Error happened during order creation!");
            }
          })
          .catch((e) => {
            setErrorText(e.name + ': ' + e.message);
            setDisplayErrorOpen( true);
            console.log(e);
          });
    }

    return (
        <div className={style['burger-constructor']}>

    <div className={style['main-block']}>
        { selected[0] && selected[0]._id && <div className={style.bun}><ConstructorElement
            type="top"
            isLocked={true}
            text={selected[0].name + ' (верх)'}
            price={selected[0].price}
            thumbnail={selected[0].image_mobile}
        /></div>}
        <div className={style.group}>
            {selected.map((ingredient, i) => (
                i > 0 && <div key={i}><DragIcon type="primary"/> <ConstructorElement
                    text={ingredient.name.length > 15 ? ingredient.name: ingredient.name + " \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 \u00A0 \u00A0 \u00A0 \u00A0"}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                /></div>
            ))}
        </div>

        { selected[0] && selected[0]._id && <div className={style.bun}><ConstructorElement
            type="bottom"
            isLocked={true}
            text={selected[0].name + ' (низ)'}
            price={selected[0].price}
            thumbnail={selected[0].image_mobile}
        /></div>}
    </div>

            <div className={style.sum}>
                <span className="text text_type_digits-medium">{totalPrice}&nbsp;</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#F2F2F3"><path d="M10.3849 2.65561C10.5818 2.18895 10.0397 1.75899 9.63011 2.05689L1.41184 8.03382C1.15309 8.222 1.00001 8.52262 1.00001 8.84256V13.4828C1.00001 13.6932 1.13171 13.8811 1.32948 13.9529L4.15637 14.9785C4.65685 15.1601 5.21185 14.9177 5.41879 14.4271L10.3849 2.65561Z"></path><path d="M1.62116 15.9076C1.32217 15.7916 1.00001 16.0122 1 16.3329C1 16.4889 1.07968 16.634 1.21127 16.7178L10.2307 22.4574C10.3326 22.5223 10.4408 22.3844 10.3536 22.3008L5.22556 17.3879C5.13043 17.2968 5.01823 17.2254 4.89541 17.1777L1.62116 15.9076Z"></path><path d="M13.6465 22.3008C13.5592 22.3844 13.6674 22.5223 13.7693 22.4574L22.7887 16.7178C22.9203 16.634 23 16.4889 23 16.3329C23 16.0122 22.6778 15.7916 22.3788 15.9076L19.1046 17.1777C18.9818 17.2254 18.8696 17.2968 18.7745 17.3879L13.6465 22.3008Z"></path><path d="M22.6705 13.9529C22.8683 13.8811 23 13.6932 23 13.4828V8.84256C23 8.52262 22.8469 8.222 22.5882 8.03382L14.3699 2.05689C13.9603 1.75899 13.4183 2.18895 13.6151 2.65561L18.5812 14.4271C18.7882 14.9177 19.3432 15.1601 19.8436 14.9785L22.6705 13.9529Z"></path><path d="M12.7142 20.9615C12.3221 21.3616 11.6779 21.3616 11.2858 20.9615L7.10635 16.6968C6.83068 16.4155 6.7458 15.9986 6.88954 15.6319L11.069 4.97004C11.4009 4.12332 12.5991 4.12333 12.931 4.97004L17.1105 15.6319C17.2542 15.9986 17.1693 16.4155 16.8937 16.6968L12.7142 20.9615Z"></path></svg>
                <div className={style.px40}></div>
                <Button 
                    type="primary" 
                    size="medium"
                    onClick={() => makeOrder()}
                >
                    Оформить заказ
                </Button>
            </div>

        </div>

    )    
}

BurgerConstructor.propTypes = {
    displayOrderInfo: PropTypes.func.isRequired
  };


export default BurgerConstructor;