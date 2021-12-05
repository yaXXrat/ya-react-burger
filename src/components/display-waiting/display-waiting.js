import style from "./display-waiting.module.css"
import classNames from 'classnames';
import waitingIcon from '../../images/waiting.gif';

const DisplayError = () => {
    return (
        <div className={classNames(style['order-details'])}>
            <h2 className={classNames(style['order-h2'], 'text', 'text_type_main-large')}>
                Секундочку
            </h2>
            <div className={classNames('text','text_type_main-default')}>
                Подождите, пожалуйста, ждем ответ сервера
            </div>
            <br/><img src={waitingIcon} alt="Ждем-с"/>
            <h3 className={classNames('text','text_type_main-default', ' text_color_inactive')}>
                <br/>Еще три байтика...
            </h3>
        </div>
    );
};

export default DisplayError;
