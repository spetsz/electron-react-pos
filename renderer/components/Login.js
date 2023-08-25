import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../context/Ctx";
import Langs from "./Languages";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { setUSER, theme, setDEAL_NUMBER, lang } = useContext(Ctx);

  const [fields, setFields] = useState({
    user: "",
    password: "",
  });

  const [notifications, setNotifications] = useState({
    text: "",
    color: "transparent",
  });

  const [input_type, setInputType] = useState("password");

  const toggleType = () => {
    input_type === "password" ? setInputType("text") : setInputType("password");
  };

  const appliedTheme = "login_header " + theme;

  const router = useNavigate();

  const login = async () => {
    setNotifications({ text: "Loading...", color: "orange" });

    if (fields.user !== "" && fields.password !== "") {
      const res = await window.api.login(fields);
      if (res.redirect) {
        const users = await window.api.allUsers();

        //setUSER(fields.user)

        setUSER(users.find((user) => user.username === fields.user));
        setDEAL_NUMBER(res.deal_number);
        router(res.redirect);
      } else {
        setNotifications(res);
      }
    } else {
      setNotifications({
        text: "Fields can not be empty. Try again!",
        color: "#EB5353",
      });
    }
  };

  const exit = () => {
    window.api.command({ type: "exit", payload: null });
  };

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="login">
      <div className={appliedTheme}>
        <h1 className="login_header_title">{Langs[lang].Login_page.title}</h1>
        <button className="login_header_button" onClick={() => exit()}>
          X
        </button>
      </div>

      <div className="breakline"></div>

      <div className="login_form">
        <input
          className={"login_form_input " + theme}
          autoFocus
          type="text"
          name="user"
          onChange={(e) =>
            setFields({ ...fields, [e.target.name]: e.target.value })
          }
          value={fields.user}
          placeholder={Langs[lang].Login_page.username_placeholder}
        />

        <div className={`login_form_password ${theme}`}>
          <input
            type={input_type}
            value={fields.password}
            name="password"
            onChange={(e) =>
              setFields({ ...fields, [e.target.name]: e.target.value })
            }
            placeholder={Langs[lang].Login_page.password_placeholder}
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
      </div>

      <div
        className="login_form_notifications"
        style={{ color: notifications.color }}
      >
        {notifications.text}
      </div>

      <div className="login_version">
        <h1>{Langs[lang].Login_page.trial_text}</h1>
      </div>

      <button
        className={"login_form_button_block " + theme}
        type="button"
        onClick={() => login()}
      >
        {Langs[lang].Login_page.button_text}
      </button>

      <div className="breakline"></div>

      <div className="login_version">
        <h1>{Langs[lang].Login_page.version_text}</h1>
      </div>
    </div>
  );
};

export default Login;
