import style from "./modal-overlay.module.css";
import React from "react";
import {TModalOverlayProps} from "../../utils/types";

const ModalOverlay = ( {onClose}: TModalOverlayProps ) => {

  const onModalClose = (e:React.UIEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      if(typeof onClose === 'function') onClose();
    }
  };

  return (
    <div
      className={style.open}
      onClick={(e) => onModalClose(e)}
    />
  );
};

export default ModalOverlay;
