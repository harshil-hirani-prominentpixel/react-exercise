import React, { Fragment,type ReactNode } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
};

const Backdrop: React.FC = () => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays") as HTMLElement;

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
