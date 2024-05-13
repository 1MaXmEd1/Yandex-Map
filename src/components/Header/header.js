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
    navigate("/admin")
  };
  const handleLogin = () => {
    navigate("/login")
  };

  return (
    <header className="header">
      <div className="textBoxLogo">
        <h1>My Yndex Maps</h1>
      </div>

      <section className="buttonGroup">
        {store.user.isAdmin && (<Button fun={handleAdmin}>Админ панель</Button>)}
        {store.user.isAuth && !isLoggedOut
          ? `Добро пожаловать ${store.user.email}`
          : "Авторизуйтесь!"}
        {store.user.isAuth && !isLoggedOut ? (
          <Button fun={handleLogout}>Выйти</Button>
        ) : (
          <Button
            fun={handleLogin}
          >
            Вход
          </Button>
        )}
      </section>
    </header>
  );
}
