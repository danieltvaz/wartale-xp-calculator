import "./styles.css";

import { InputHTMLAttributes } from "react";

export default function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="textinput--wrapper">
      <input {...props} className="textinput--input" />
    </div>
  );
}
