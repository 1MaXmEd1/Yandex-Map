import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import MapBlock from "../MapBlock/MapBlock.js";
export const MainPage = () => (
  <>
    <Header></Header>

    <main className="main">
      <div className="descriptionBlock">
        <p className="descriptionText">
          My Yandex Maps - это некомерческий проект который был создан для
          расширения взаимодействия с яндекс картами. Он включает в себя
          добавление собственных точек по координатам с использование базы
          данных для сохранения поставленых точек у авторизованных
          пользователей.
        </p>
      </div>

      <div className="mapBlock">
        <MapBlock></MapBlock>
      </div>
    </main>

    <Footer></Footer>
  </>
);
