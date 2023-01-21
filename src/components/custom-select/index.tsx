import "./styles.css";

import { HTMLAttributes } from "react";

type Option = {
  id: number;
  title: string;
  value: string;
  default?: boolean;
};

type CustomSelectProps = {
  options: Option[];
} & HTMLAttributes<Partial<HTMLInputElement>>;

export default function CustomSelect({ options, ...props }: CustomSelectProps) {
  return (
    <select {...props} className="select">
      {options.map((option, index) => (
        <option
          {...(option.default && { selected: true, disabled: true, hidden: true })}
          value={option.value}
          key={`${option.value}-${index}`}>
          {option.title}
        </option>
      ))}
    </select>
  );
}
