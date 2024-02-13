import "./styles.css";

import { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  direction?: "row" | "column";
  align?: "flex-start" | "center" | "flex-end";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  flex?: number;
};

export default function SectionContainer({ children, direction, align, justify, flex }: SectionContainerProps) {
  return (
    <div
      className="sectioncontainer--wrapper"
      style={{ flexDirection: direction, alignItems: align, justifyContent: justify, flex: flex }}>
      {children}
    </div>
  );
}
