import React from "react";
import "./Popup.css";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal">
        <h1 className="error-message">{message}</h1>
      </div>
    </>
  );
};

export default ErrorModal;
