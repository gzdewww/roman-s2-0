import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Button from "../Button/Button";
import "./Select.scss";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  activeOption: string;
  setActiveOption: (option: Option) => void;
};

export default function Select({
  options,
  activeOption,
  setActiveOption,
}: SelectProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [expanded]);

  const handleOptionClick = (option: Option) => {
    setActiveOption(option);
    setExpanded(false);
  };

  return (
    <div ref={ref} className={`select ${expanded ? " select--expanded" : ""}`}>
      <ul
        className="select__options"
        style={{ "--option-count": options.length }}
      >
        {options.map((option) => (
          <li
            tabIndex={expanded ? 0 : -1}
            key={option.value}
            className={`select__option${
              option.value === activeOption ? " select__option--active" : ""
            }`}
            onClick={() => {
              handleOptionClick(option);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setActiveOption(option);
                setExpanded(false);
              }
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <Button className="select__button" onClick={() => setExpanded(!expanded)}>
        <p className="select__text">
          {options.find((item) => item.value === activeOption)?.label}
        </p>
        <BsChevronDown className="select__icon" />
      </Button>
    </div>
  );
}
