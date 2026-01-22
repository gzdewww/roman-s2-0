import React from "react";
import "./Input.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  value?: string;
  onChangeValue?: (value: string) => void;
}

export const Input = ({
  label,
  error,
  value,
  onChangeValue,
  className = "",
  ...props
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChangeValue) return;
    onChangeValue(e.target.value);
  };

  return (
    <div className={`input ${error ? "input--error" : ""} ${className}`}>
      {label && <label className="input__label">{label}</label>}
      <input
        className="input__field"
        value={value}
        onChange={handleChange}
        {...props}
      />

      {error && <span className="input__error">{error}</span>}
    </div>
  );
};
