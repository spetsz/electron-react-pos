import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { gsap } from "gsap";
import PopUp from "./PopUp";
import Langs from "./Languages";

const ChangeAdminPass = ({ user, theme, lang }) => {
  const [password, setPassword] = useState("");
  const [input_type, setInputType] = useState("password");
  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    redirect: "",
    type: "",
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await window.api.allUsers();

      if (res) {
        const admin = res.find((user) => user.username === "Admin");

        const grantedObject = await window.api.checkPrivilege({
          username: user.username,
          privilege: "CHANGE_ADMIN_PASSWORD",
        });

        if (grantedObject.granted) {
          setPassword(admin.password);
        } else {
          setPopUp({
            active: true,
            message: Langs[lang].notifications.access_denied,
            redirect: "/home/selling",
            type: "info",
          });
        }
      }
    };

    fetchAdmin();

    gsap.from(document.querySelector(".settings_detail"), {
      opacity: 0,
      duration: 2,
    });
  }, []);

  const save = async () => {
    const res = await window.api.updateAdminPassword({ password });
    if (res && res.text === "Password updated successfully!") {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.admin_pass_updated,
        redirect: "",
        type: "success",
      });

      setInputType("password");
    }
  };

  const toggleType = () => {
    input_type === "password" ? setInputType("text") : setInputType("password");
  };

  return (
    <>
      <div dir={lang === "ar" ? "rtl" : "ltr"} className="settings_detail">
        <h1>{Langs[lang].Settings.Users.change_admin_password[0]}</h1>

        <div className="settings_controls">
          <div className="admin_pass_input">
            <input
              type={input_type}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {input_type === "password" ? (
              <AiFillEye style={{ cursor: "pointer" }} onClick={toggleType} />
            ) : (
              <AiFillEyeInvisible
                style={{ cursor: "pointer" }}
                onClick={toggleType}
              />
            )}
          </div>
          <button className={`admin_pass_save_btn ${theme}`} onClick={save}>
            {Langs[lang].Settings.Users.change_admin_password[1]}
          </button>
        </div>
      </div>

      {popUp.active && (
        <PopUp theme={theme} setPopUp={setPopUp} popUp={popUp} />
      )}
    </>
  );
};

export default ChangeAdminPass;
