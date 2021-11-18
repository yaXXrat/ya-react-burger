import { useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from 'classnames';
import style from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({ children, isOpen, onClose, className}) => {
  useEffect(() => {
    const handleClose = (e) => {
      e.keyCode === 27 && onClose();
    };
    window.addEventListener("keydown", handleClose);
    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, [onClose]);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <>
        <ModalOverlay onClose={onClose}>
          <div className={classNames(style.modal, className)}>
            <div className={classNames(style['close'], 'mt-10', 'mr-10')}>
              <CloseIcon type="primary" onClick={onClose} />
            </div>
            {children}
          </div>
        </ModalOverlay>
      </>,
      document.getElementById("react-modals")
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
export default Modal;
