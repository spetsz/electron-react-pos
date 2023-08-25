import React, { useState, useContext } from "react";
import ChangeAdminPass from "./ChangeAdminPass";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import ModifyUser from "./ModifyUser";
import Langs from "./Languages";
import { Ctx } from "../context/Ctx";
import PopUp from "./PopUp";

const Users = ({ lang }) => {
  const [component, setComponent] = useState("CHANGE_ADMIN_PASSWORD");
  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    type: "",
    redirect: "",
  });

  const { USER, theme } = useContext(Ctx);

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="settings_users"
      >
        <nav>
          <div
            className={theme}
            style={{
              color:
                component === "CHANGE_ADMIN_PASSWORD" ? "#F9D923" : "white",
              borderLeft: lang === "ar" ? "1px solid white" : "none",
              borderRight: lang === "ar" ? "none" : "1px solid white",
            }}
            onClick={() => setComponent("CHANGE_ADMIN_PASSWORD")}
          >
            {Langs[lang].Settings.Users.components[0]}
          </div>
          <div
            className={theme}
            style={{
              color: component === "ADD_USER" ? "#F9D923" : "white",
              borderLeft: lang === "ar" ? "1px solid white" : "none",
              borderRight: lang === "ar" ? "none" : "1px solid white",
            }}
            onClick={async () => {
              const res = await window.api.checkPrivilege({
                username: USER.username,
                privilege: "ADD_USERS",
              });

              if (res.granted) {
                setComponent("ADD_USER");
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
            {Langs[lang].Settings.Users.components[1]}
          </div>
          <div
            className={theme}
            style={{
              color: component === "DELETE_USER" ? "#F9D923" : "white",
              borderLeft: lang === "ar" ? "1px solid white" : "none",
              borderRight: lang === "ar" ? "none" : "1px solid white",
            }}
            onClick={async () => {
              const res = await window.api.checkPrivilege({
                username: USER.username,
                privilege: "DELETE_USERS",
              });

              if (res.granted) {
                setComponent("DELETE_USER");
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
            {Langs[lang].Settings.Users.components[2]}
          </div>
          <div
            className={theme}
            style={{
              borderRight: "none",
              color: component === "MODIFY_USER" ? "#F9D923" : "white",
            }}
            onClick={async () => {
              const res = await window.api.checkPrivilege({
                username: USER.username,
                privilege: "MODIFY_USERS",
              });

              if (res.granted) {
                setComponent("MODIFY_USER");
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
            {Langs[lang].Settings.Users.components[3]}
          </div>
        </nav>

        {component === "CHANGE_ADMIN_PASSWORD" ? (
          <ChangeAdminPass theme={theme} user={USER} lang={lang} />
        ) : component === "ADD_USER" ? (
          <AddUser theme={theme} lang={lang} />
        ) : component === "DELETE_USER" ? (
          <DeleteUser theme={theme} lang={lang} />
        ) : component === "MODIFY_USER" ? (
          <ModifyUser lang={lang} theme={theme} />
        ) : (
          <div>Settings</div>
        )}
      </div>

      {popUp.active ? (
        <PopUp setPopUp={setPopUp} theme={theme} popUp={popUp} />
      ) : null}
    </>
  );
};

export default Users;
