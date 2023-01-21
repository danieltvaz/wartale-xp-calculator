import "./styles.css";

import { ReactNode } from "react";

type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  return <main className="main-wrapper">{children}</main>;
}
