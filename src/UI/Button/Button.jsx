import "./Button.scss";

export default function Button({ children, onClick, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`custom-button ${className ? className : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
