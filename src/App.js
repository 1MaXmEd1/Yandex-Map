import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  PageReg,
  PageLog,
} from "./components/pages/regist-and-login/regLogPage.js";
import MainPage from "./components/pages/mainPages.js";
import { useContext } from "react";
import { Context } from "./index.js";
import AdminPanel from "./components/pages/adminPanel/adminPanel.js";
import { observer } from "mobx-react-lite";

function App() {
  const { store } = useContext(Context);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>

          <Route
            path="/admin"
            element={store.user.isAdmin ? <AdminPanel /> : <MainPage />}
          />

          <Route path="/registration" element={<PageReg />}></Route>
          <Route path="/login" element={<PageLog />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default observer(App);
