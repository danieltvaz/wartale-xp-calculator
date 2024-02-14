import "./styles.css";

import { HTMLProps } from "react";

type Option = {
  id: number | string;
  title: string | number | undefined;
  value?: number | string;
  default?: boolean;
};

export type CustomSelectProps = {
  options: Option[];
} & HTMLProps<HTMLSelectElement>;

export default function CustomSelect({ options, ...props }: CustomSelectProps) {
  return (
    <select className="select" {...props}>
      {!options.length && <option>- - - - -</option>}
      {options.map((option, index) => (
        <option
          {...(option.default && { disabled: true, hidden: true })}
          value={option?.value}
          key={`${option?.value}-${index}`}>
          {option.title}
        </option>
      ))}
    </select>
  );
}
