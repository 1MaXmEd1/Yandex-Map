import { useContext, useEffect } from "react";
import { Context } from "../..";
import Button from "../button/button";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Header = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const handleLogout = async () => {
    await store.logout();
  };

  const handleAdmin = () => {
    if (store.user.isAdmin) {
      navigate("/admin");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="sliceOne">
        <div className="logoName">
          <div className="textBoxLogo">
            <h1>My Yandex Maps</h1>
          </div>
        </div>
        <div className="interactiveBlock">
          <div className="interactiveGroup">
            <div className="greetingBox">
              <p className="greetingText">
                {store.isAuth
                  ? `Добро пожаловать, ${store.user.email}!`
                  : "Вы не авторизованы!"}
              </p>
            </div>
            <div className="buttonGroup">
              {store.user.isAdmin && (
                <Button onClick={handleAdmin}>Админ панель</Button>
              )}
              {store.isAuth ? (
                <Button onClick={handleLogout}>Выйти</Button>
              ) : (
                <Button onClick={handleLogin}>Вход</Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sliceTwo">
        <div className="descriptionBlock">
          <p className="descriptionText">
            My Yandex Maps - это некоммерческий проект, который был создан для
            расширения взаимодействия с яндекс картами. Он включает в себя
            добавление собственных точек по координатам с использованием базы
            данных для сохранения поставленных точек у авторизованных
            пользователей.
          </p>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
