import "../Button/Button.css";

export default function Button({ children, fun, cha }) {
  return (
    <button onClick={fun} onChange={cha} className="button">
      {children}
    </button>
  );
}
