import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      role="button"
      onClick={onClick}
      className={`custom-button ${className ? className : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
