import "./styles.css";

import { ReactNode } from "react";

type TypographyProps = {
  color?: string;
  children: ReactNode;
  textAlign?: "left" | "center" | "right";
};

export default function Typography({ color, children, textAlign = "center" }: TypographyProps) {
  return (
    <span className="typography" style={{ color: color ?? "white", textAlign }}>
      {children}
    </span>
  );
}
