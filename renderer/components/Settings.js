import React, { useState, useContext } from "react";
import Priveleges from "./Priveleges";
import Users from "./Users";
import Parameters from "./Parameters";
import { Ctx } from "../context/Ctx";
import Langs from "./Languages";
import PopUp from "./PopUp";

const Settings = () => {
  const { theme, USER, lang } = useContext(Ctx);
  const [component, setComponent] = useState("users");
  const [popUp, setPopUp] = useState({
    active: false,
    type: "",
    redirect: "",
    message: "",
  });

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`settings_container ${theme}`}
      >
        <nav className={theme}>
          <div
            style={{
              color: component === "users" ? "#F9D923" : "white",
              borderLeft: lang === "ar" ? "1px solid white" : "none",
              borderRight: lang === "ar" ? "none" : "1px solid white",
            }}
            onClick={() => setComponent("users")}
          >
            {Langs[lang].Settings.components[0]}
          </div>
          <div
            style={{
              color: component === "priveleges" ? "#F9D923" : "white",
              borderLeft: lang === "ar" ? "1px solid white" : "none",
              borderRight: lang === "ar" ? "none" : "1px solid white",
            }}
            onClick={async () => {
              const res = await window.api.checkPrivilege({
                username: USER.username,
                privilege: "GRANT_PRIVILEGES",
              });

              if (res && res.granted) {
                setComponent("priveleges");
              } else {
                setPopUp({
                  active: true,
                  message: Langs[lang].notifications.access_denied,
                  redirect: "",
                  type: "info",
                });
              }
            }}
          >
            {Langs[lang].Settings.components[1]}
          </div>
          <div
            style={{
              borderRight: "none",
              color: component === "parameters" ? "#F9D923" : "white",
            }}
            onClick={async () => {
              const res = await window.api.checkPrivilege({
                username: USER.username,
                privilege: "ACCESS_PARAMETERS",
              });

              if (res && res.granted) {
                setComponent("parameters");
              } else {
                setPopUp({
                  active: true,
                  message: Langs[lang].notifications.access_denied,
                  redirect: "",
                  type: "info",
                });
              }
            }}
          >
            {Langs[lang].Settings.components[2]}
          </div>
        </nav>

        {component === "users" ? (
          <Users lang={lang} />
        ) : component === "priveleges" ? (
          <Priveleges lang={lang} />
        ) : (
          <Parameters lang={lang} />
        )}
      </div>

      {popUp.active ? (
        <PopUp theme={theme} popUp={popUp} setPopUp={setPopUp} />
      ) : null}
    </>
  );
};

export default Settings;
