import "./input.css";
export const Input = ({ children, id, value, onChange }) => {
  return (
    <input
      className="input"
      placeholder={children}
      id={id}
      value={value}
      onChange={onChange}
    ></input>
  );
};
export default Input;
