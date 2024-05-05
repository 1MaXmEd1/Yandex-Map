import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageReg, PageLog } from "./components/Pages/RegLog/RegLog-page.js";
import { MainPage } from "./components/Pages/Main-pages.js";
import { useState, useEffect, useContext } from "react";
import { Context } from "./index.js";
function App() {
  const { store } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndSetLoading = async () => {
      if (!store.isAuth && localStorage.getItem("token")) {
        await store.checkAuth();
      }
      setIsLoading(false);
    };
  
    checkAuthAndSetLoading();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>

          <Route path="/registration" element={<PageReg />}></Route>
          <Route path="/login" element={<PageLog />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
