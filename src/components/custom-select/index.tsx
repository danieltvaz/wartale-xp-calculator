import "./styles.css";

import { HTMLAttributes, HTMLProps } from "react";

type Option = {
  id: number;
  title: string;
  value: any;
  default?: boolean;
};

type CustomSelectProps = {
  options: Option[];
} & HTMLProps<HTMLSelectElement>;

export default function CustomSelect({ options, ...props }: CustomSelectProps) {
  return (
    <select {...props} className="select">
      {options.map((option, index) => (
        <option
          {...(option.default && { disabled: true, hidden: true })}
          value={option.value}
          key={`${option.value}-${index}`}>
          {option.title}
        </option>
      ))}
    </select>
  );
}
