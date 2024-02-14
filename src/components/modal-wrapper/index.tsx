import "./styles.css";

import React, { ReactNode, SetStateAction } from "react";

import Logo from "../logo";

export type ModalWrapperProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  zIndex?: number;
};

export default function ModalWrapper({ isVisible, setIsVisible, children, zIndex }: ModalWrapperProps) {
  return (
    <div className={`modal--wrapper modal--wrapper_${isVisible}`} style={{ zIndex: zIndex }}>
      <div className="modal--wrapper_header-wrapper">
        <Logo />
        <div onClick={() => setIsVisible(false)} className="modal-content--wrapper_close-wrapper">
          X
        </div>
      </div>
      <div className="modal-content--wrapper">{children}</div>
    </div>
  );
}
