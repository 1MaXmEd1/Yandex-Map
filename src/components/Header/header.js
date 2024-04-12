import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import Button from "../Button/Button";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const { store } = useContext(Context);
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <header className="header">
      <div className="textBoxLogo">
        <h1>My Yndex Maps</h1>
      </div>

      <section className="buttonGroup">
        {store.isAuth
          ? `Добро пожаловать ${store.user.email}`
          : "Авторизуйтесь!"}
        {store.isAuth ? (
          <Button className="logout" fun={() => store.logout()}>Выйти</Button>
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
