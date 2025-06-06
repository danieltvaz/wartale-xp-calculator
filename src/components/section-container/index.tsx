import "./styles.css";

import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  direction?: "row" | "column";
  align?: "flex-start" | "center" | "flex-end";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  flex?: number;
  gap?: string;
  width?: string;
  height?: string;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function SectionContainer({
  children,
  direction,
  align,
  justify,
  flex,
  gap,
  width,
  height,
  flexWrap,
  ...props
}: SectionContainerProps) {
  return (
    <div
      {...props}
      className="sectioncontainer--wrapper"
      style={{
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flex,
        gap,
        width,
        height,
        flexWrap,
        ...props.style,
      }}>
      {children}
    </div>
  );
}
