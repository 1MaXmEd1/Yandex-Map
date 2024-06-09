import "./regLogPage.css";
import Button from "../../button/button.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../../index.js";

const LoginAndRegister = (index, butt, desc, link, linkd) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationMode, setRegistrationMode] = useState(
    index === "Регистрация"
  );
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async () => {
    await store.login(email, password);
    if (store.isAuth) {
      navigate("/");
    }
  };

  const handleRegister = async () => {
    await store.registration(email, password);
    if (store.isAuth) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="workZone">
        <div className="clouseBlock">
          <Link className="clouse" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="40px"
              height="40px"
            >
              {" "}
              <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z" />
            </svg>
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
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
            {registrationMode && (
              <input
                className="inputRL"
                placeholder={"Повторите пароль"}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              ></input>
            )}
          </div>
          <div className="btnBlock">
            <div className="btnConteiner">
              {index === "Вход" ? (
                <Button onClick={handleLogin}>{butt}</Button>
              ) : (
                <Button onClick={handleRegister}>{butt}</Button>
              )}
            </div>
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
  LoginAndRegister(
    "Вход",
    "Войти",
    "Если у вас нет аккаунта, то",
    "/registration",
    "зарегестрируйтесь"
  );
export const PageReg = () =>
  LoginAndRegister(
    "Регистрация",
    "Регистрация",
    "Если у вас уже есть аккаунт, то",
    "/login",
    "войдите"
  );
