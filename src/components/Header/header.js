import { useContext, useState } from "react";
import { Context } from "../..";
import Button from "../button/Button";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const { store } = useContext(Context);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    await store.logout();
    setIsLoggedOut(true);
  };

  const handleAdmin = () => {
    navigate("/admin");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logoName">
        <div className="textBoxLogo">
          <h1>My Yndex Maps</h1>
        </div>
      </div>
      <div className="interectiveBlock">
        <div className="helloingBox">
          <p className="helloingTxt">
            {store.user.isAuth && !isLoggedOut
              ? `Добро пожаловать ${store.user.email}`
              : "Вы не авторизованы!"}
          </p>
        </div>
        <div className="buttonGroup">
          {store.user.isAdmin && (
            <Button onClick={handleAdmin}>Админ панель</Button>
          )}
          {store.user.isAuth && !isLoggedOut ? (
            <Button onClick={handleLogout}>Выйти</Button>
          ) : (
            <Button onClick={handleLogin}>Вход</Button>
          )}
        </div>
      </div>
    </header>
  );
}
