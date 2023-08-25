import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { Ctx } from "./context/Ctx";

const App = () => {
  const [USER, setUSER] = useState("");
  const [DEAL_NUMBER, setDEAL_NUMBER] = useState(1);
  const [total, setCost] = useState(0);
  const [lang, setLang] = useState("fr");
  const [theme, setTheme] = useState("red_theme");

  useEffect(() => {
    const getParams = async () => {
      setLang(await window.api.getLanguage());
      setTheme(await window.api.getTheme());
    };

    getParams();
  }, []);

  return (
    <Ctx.Provider
      value={{
        USER,
        setUSER,
        DEAL_NUMBER,
        setDEAL_NUMBER,
        total,
        setCost,
        lang,
        setLang,
        theme,
        setTheme,
      }}
    >
      <div className="main_window">
        <HashRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/home/*" exact element={<Home lang={lang} />} />
          </Routes>
        </HashRouter>
      </div>
    </Ctx.Provider>
  );
};

export default App;
