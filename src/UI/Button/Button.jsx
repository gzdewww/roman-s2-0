import "./Button.scss";

export default function Button({ children, onClick, className, ...props }) {
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
