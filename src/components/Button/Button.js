import "./Button.css";

export default function Button({ children, onClick, onChange }) {
  return (
    <button onClick={onClick} onChange={onChange} className="button">
      {children}
    </button>
  );
}
