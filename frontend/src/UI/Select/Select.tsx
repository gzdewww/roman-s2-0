import React, { useEffect, useRef, useState, useCallback } from "react";
import { BsChevronDown } from "react-icons/bs";
import Button from "../Button/Button";
import "./Select.scss";

export type Option = {
  value: string;
  label: string;
  onClick?: () => void;
};

export type SelectProps = {
  options: Option[];
  value: string;
  onChange?: (value: string, option: Option) => void; // Сделали опциональным
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  ariaLabel = "Select dropdown",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedIndex >= 0) {
            const option = options[focusedIndex];
            if (option) {
              handleSelectOption(option);
            }
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, focusedIndex, options]);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current) {
      const optionElements = optionsRef.current.children;
      if (optionElements[focusedIndex]) {
        (optionElements[focusedIndex] as HTMLElement).scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleSelectOption = useCallback(
    (option: Option) => {
      if (typeof onChange === "function") {
        onChange(option.value, option);
      }
      setIsOpen(false);
      setFocusedIndex(-1);

      if (option.onClick) {
        option.onClick();
      }
    },
    [onChange],
  );

  const handleToggle = useCallback(() => {
    if (disabled) return;

    setIsOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      } else {
        setFocusedIndex(-1);
      }
      return nextState;
    });
  }, [disabled, options, value]);

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    option: Option,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelectOption(option);
    }
  };

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleToggle();
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(options.length - 1);
        }
        break;
    }
  };

  const handleOptionMouseEnter = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <div
      ref={selectRef}
      className={`select ${isOpen ? "select--expanded" : ""} ${disabled ? "select--disabled" : ""} ${className}`}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      <Button
        className="select__button"
        onClick={handleToggle}
        onKeyDown={handleButtonKeyDown}
        disabled={disabled}
        aria-label={`${selectedOption?.label || placeholder}. ${isOpen ? "Expanded" : "Collapsed"}. Press arrow keys to navigate options.`}
        aria-controls="select-options"
        tabIndex={0}
      >
        <span className="select__text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <BsChevronDown className="select__icon" aria-hidden="true" />
      </Button>

      <ul
        ref={optionsRef}
        id="select-options"
        className="select__options"
        style={{ "--option-count": options.length } as React.CSSProperties}
        role="listbox"
        aria-label="Select options"
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`select__option ${
              option.value === value ? "select__option--active" : ""
            } ${index === focusedIndex ? "select__option--focused" : ""}`}
            role="option"
            aria-selected={option.value === value}
            onClick={() => handleSelectOption(option)}
            onKeyDown={(e) => handleOptionKeyDown(e, option)}
            onMouseEnter={() => handleOptionMouseEnter(index)}
            tabIndex={-1}
            data-value={option.value}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
