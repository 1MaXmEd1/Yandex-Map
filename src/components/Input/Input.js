import "./Input.css";
export default function Input({ children, id, value, onChange }) {
  return (
    <input
      className="input"
      placeholder={children}
      id={id}
      value={value}
      onChange={onChange}
    ></input>
  );
}
