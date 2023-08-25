import React, { useContext, useEffect } from "react";
import { Ctx } from "../context/Ctx";
import { gsap } from "gsap";
import Langs from "./Languages";

const Parameters = ({ lang }) => {
  const { setLang, theme, setTheme } = useContext(Ctx);

  useEffect(() => {
    gsap.from(document.querySelector(".parameters_container"), {
      opacity: 0,
      duration: 2,
    });
  }, []);

  const changeLanguage = async (e) => {
    setLang(e.target.value);

    const res = await window.api.changeLanguage(e.target.value);
    if (res) {
      console.log(res);
    }
  };

  const changeTheme = async (e) => {
    setTheme(e.target.value);

    const res = await window.api.changeTheme(e.target.value);
    if (res) {
      console.log(res);
    }
  };

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="parameters_container">
      <h1>{Langs[lang].Settings.Parameters.header_text}</h1>

      <div className="parameters_container_options">
        <div className="parameters_container_option">
          <label>{Langs[lang].Settings.Parameters.language_label} :</label>
          <select value={lang} onChange={(e) => changeLanguage(e)}>
            <option value="en">
              {Langs[lang].Settings.Parameters.english}
            </option>
            <option value="fr">{Langs[lang].Settings.Parameters.french}</option>
            <option value="ar">{Langs[lang].Settings.Parameters.arabic}</option>
          </select>
        </div>

        <div className="parameters_container_option">
          <label>{Langs[lang].Settings.Parameters.theme_label} :</label>
          <select value={theme} onChange={(e) => changeTheme(e)}>
            <option value="dark_theme">
              {Langs[lang].Settings.Parameters.dark}
            </option>
            <option value="green_theme">
              {Langs[lang].Settings.Parameters.green}
            </option>
            <option value="blue_theme">
              {Langs[lang].Settings.Parameters.blue}
            </option>
            <option value="red_theme">
              {Langs[lang].Settings.Parameters.red}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Parameters;
