import "./RegLog.css";
import "./logBlock/BlockAuth.js";
import Button from "../../Button/Button.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../../index.js";

const RegAndLog = (index, butt, desc, link, linkd) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const handleLogin = async () => {
    await store.login(email, password);
    navigate("/")
  };

  return (
    <>
      <div className="workZone">
        <div className="clouseBlock">
          <Link className="clouse" to="/">
            {" "}
            ×{" "}
          </Link>
        </div>
        <div className="mainBlock">
          <div className="titleBlock">
            <h2 className="title">{index}</h2>
          </div>
          <div className="inputBlock">
            <input
              className="inputRL"
              placeholder={"Введите почту"}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <input
              className="inputRL"
              placeholder={"Введите пароль"}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
          <div className="btnBlock">
            {/* Нужно придумать как менять функцию у кнопки */}
            <Button fun={handleLogin}>
              {butt}
            </Button>
          </div>
          <div className="descBlock">
            <p className="desc">
              {desc} <Link to={link}>{linkd}</Link>
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export const PageLog = () =>
  RegAndLog(
    "Вход",
    "Войти",
    "Если у вас нет аккаунта, то",
    "/registration",
    "зарегестрируйтесь"
  );
export const PageReg = () =>
  RegAndLog(
    "Регистрация",
    "Регистрация",
    "Если у вас уже есть аккаунт, то",
    "/login",
    "войдите"
  );
