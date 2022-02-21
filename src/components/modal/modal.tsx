import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from 'classnames';
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {TModalProps} from "../../services/types/types";

const Modal: React.FC<TModalProps> = ({ children, onClose= function() {}, className}) => {
  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      e.code === 'Escape' && onClose();
    };
    window.addEventListener("keydown", handleClose);
    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, [onClose]);

  return (
    ReactDOM.createPortal(
      <>
            <div className={classNames(style.modal, className)}>
              { typeof onClose === 'function' ? <div data-cy="closeIcon" className={classNames(style['close'], 'mt-10', 'mr-10')}>
                <CloseIcon type="primary" onClick={onClose} />
              </div> : ''}
              {children}
            </div>
        <ModalOverlay onClose={onClose}/>
      </>,
      document.getElementById("react-modals") as HTMLDivElement
    )
  );
};

export default Modal;
