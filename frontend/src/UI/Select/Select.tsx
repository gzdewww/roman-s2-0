import React, { useEffect, useRef, useState, useCallback } from "react";
import { BsChevronDown } from "react-icons/bs";
import Button from "../Button/Button";
import "./Select.scss";

export type Option<T> = {
  value: T | null;
  label: string;
  onClick?: () => void;
};

export type SelectProps<T> = {
  options: Option<T>[];
  value: T | null;
  onChange?: (option: Option<T>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

// ... остальные импорты без изменений ...

export default function Select<T>({
  options,
  value = options[0]?.value || null,
  onChange,
  placeholder = "Выберите...",
  className = "",
  disabled = false,
  ariaLabel = "Select dropdown",
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Проверяем, находится ли фокус внутри этого селекта
  const isFocusedInside = () => {
    return selectRef.current?.contains(document.activeElement);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;

      // Реагируем только если фокус на селекте
      if (!isFocusedInside()) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          // Но не открываем все сразу — только если фокус на этом селекте
          // Чтобы избежать открытия всех, мы НЕ открываем по стрелке, если фокус не внутри
          return;
        }
        return;
      }

      if (!isOpen) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setIsOpen(true);
          setFocusedIndex(options.length - 1);
        }
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedIndex >= 0) {
            handleSelectOption(
              options[focusedIndex] || { value: null, label: "" },
            );
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
    },
    [isOpen, focusedIndex, options, disabled],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Прокрутка к активному элементу
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current) {
      const optionElement = optionsRef.current.children[focusedIndex];
      if (optionElement) {
        (optionElement as HTMLElement).scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleSelectOption = useCallback(
    (option: Option<T>) => {
      if (onChange && option.value !== null) {
        onChange(option);
      }
      if (option.onClick) {
        option.onClick();
      }
      setIsOpen(false);
      setFocusedIndex(-1);
    },
    [onChange],
  );

  const handleToggle = useCallback(() => {
    if (disabled) return;

    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      } else {
        setFocusedIndex(-1);
      }
      return next;
    });
  }, [disabled, options, value]);

  const handleOptionMouseEnter = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  return (
    <div
      ref={selectRef}
      className={[
        "select",
        isOpen && "select--expanded",
        disabled && "select--disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={-1} // Делаем контейнер "фокусируемым" через дочерние элементы
    >
      <Button
        className="select__button"
        onClick={handleToggle}
        onKeyDown={(e) => {
          // Кнопка сама по себе фокусируется — это точка входа
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        disabled={disabled}
        aria-label={
          selectedOption
            ? `${selectedOption.label}. ${isOpen ? "Expanded" : "Collapsed"}. Use arrow keys to navigate.`
            : `${placeholder}. Press Enter or Space to open.`
        }
        aria-controls="select-options"
        tabIndex={0} // Кнопка — основная точка фокуса
      >
        <span className="select__text">
          {selectedOption?.label || placeholder}
        </span>
        <BsChevronDown className="select__icon" aria-hidden="true" />
      </Button>

      <ul
        ref={optionsRef}
        id="select-options"
        className="select__options"
        role="listbox"
        aria-label="Select options"
        style={{ "--option-count": options.length } as React.CSSProperties}
      >
        {options.map((option, index) => (
          <li
            key={option.label}
            className={[
              "select__option",
              option.value === value && "select__option--active",
              index === focusedIndex && "select__option--focused",
            ]
              .filter(Boolean)
              .join(" ")}
            role="option"
            aria-selected={option.value === value}
            onClick={() => handleSelectOption(option)}
            onMouseEnter={() => handleOptionMouseEnter(index)}
            tabIndex={-1}
            data-value={option.value ?? ""}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
