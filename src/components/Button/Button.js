import "./button.css";

const Button = ({ children, onClick, onChange }) => {
  return (
    <button onClick={onClick} onChange={onChange} className="button">
      {children}
    </button>
  );
};
export default Button;
