import { useContext, useState } from "react";
import { Context } from "../..";
import Button from "../Button/Button";
import "./header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const { store } = useContext(Context);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    await store.logout();
    setIsLoggedOut(true);
  };

  return (
    <header className="header">
      <div className="textBoxLogo">
        <h1>My Yndex Maps</h1>
      </div>

      <section className="buttonGroup">
        {store.isAuth && !isLoggedOut
          ? `Добро пожаловать ${store.user.email}`
          : "Авторизуйтесь!"}
        {store.isAuth && !isLoggedOut ? (
          <Button className="logout" fun={handleLogout}>Выйти</Button>
        ) : (
          <Button
            fun={() => navigate("login", { replace: false })}
            className="login"
          >
            Вход
          </Button>
        )}
      </section>
    </header>
  );
}
