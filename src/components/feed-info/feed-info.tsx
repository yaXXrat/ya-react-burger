import React from 'react';
import style from './feed-info.module.css';
import {TOrdersState} from "../../services/reducers/orders";

const FeedInfo = ( {data}: {data: TOrdersState}) => {

    return (
        <div className={style['feed-info']}>
            <div className={style['main-block'] + ' text text_type_main-medium' }>
                <div className={style.flexgroup}>
                    <div className={style.flexdivs}>Готовы:
                    <section className={ style.container +' text text_type_digits-default'}>
                        { data.orders.map( (order) => (
                            order.status === 'done' && <div key={order.id} className={style.done}>
                                {order.id.toString().padStart(5, '0')}
                            </div>
                        ))}
                    </section>
                    </div>
                    <div className={style.flexdivs}>В работе:
                        <section className={ style.container +' text text_type_digits-default'}>
                            { data.orders.map( (order) => (
                                order.status === 'pending' && <div key={order.id}>
                                    {order.id.toString().padStart(5, '0')}
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
                <div className={style.group + ' text text_type_main-medium'} >
                    Выполнено за все время:<br/>
                    <span className={'text text_type_digits-large'}>{data.total.toLocaleString('ru-ru', {minimumFractionDigits: 0})}</span>
                    Выполнено за сегодня:<br/>
                    <span className={'text text_type_digits-large'}>{data.todayTotal.toLocaleString('ru-ru', {minimumFractionDigits: 0})}</span><br/>
                </div>

            </div>

        </div>

    )
}

export default FeedInfo;
