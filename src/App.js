import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageReg, PageLog } from "./components/Pages/RegLog/RegLog-page.js";
import { MainPage } from "./components/Pages/Main-pages.js";

function App() {

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
