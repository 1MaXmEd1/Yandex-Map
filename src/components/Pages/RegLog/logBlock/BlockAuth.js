import "../logBlock/BlockAuth.css";

export default function BlockAuth({ children }) {
  return (
    <>
      <div className="inputBlock">
        <input className="inputRL" placeholder={children}></input>
      </div>
    </>
  );
}
