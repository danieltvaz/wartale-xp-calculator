import "./styles.css";

import { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  direction?: "row" | "column";
};

export default function SectionContainer({ children, direction }: SectionContainerProps) {
  return (
    <div className="sectioncontainer--wrapper" style={{ flexDirection: direction }}>
      {children}
    </div>
  );
}
