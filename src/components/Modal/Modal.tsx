import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss'

type Modal = {
  children: ReactNode
}

export const Modal: React.FC<Modal> = ({children}) => {

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className="modal">
      {children}
    </div>,
    modalRoot
  );
}
