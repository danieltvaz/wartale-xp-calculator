import "./styles.css";

import { ReactNode, SetStateAction } from "react";

type Props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  zIndex?: number;
};

export default function BottomModalWrapper({ isVisible, setIsVisible, children, zIndex }: Props) {
  return (
    <div className={`bottom-modal--wrapper bottom-modal--wrapper_${isVisible}`} style={{ zIndex: zIndex }}>
      <div
        className={`bottom-modal-outer--wrapper bottom-modal-outer--wrapper_${isVisible}`}
        onClick={() => setIsVisible(false)}
      />
      <div className="bottom-modal-content--wrapper">
        <div className="bottom-modal-detail--wrapper"></div>
        {children}
      </div>
    </div>
  );
}
