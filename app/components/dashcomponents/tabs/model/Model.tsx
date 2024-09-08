import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-75 z-50 flex justify-center items-center px-10">
      <button
        className="absolute top-0 right-0 m-4 text-gray-200 hover:text-gray-400"
        onClick={onClose}
      >
        Close
      </button>
      {children}
    </div>
  );
};

export default Modal;
