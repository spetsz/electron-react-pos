import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { gsap } from "gsap";
import PopUp from "./PopUp";
import Langs from "./Languages";

const AddUser = ({ lang, theme }) => {
  const [fields, setFields] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [input_type, setInputType] = useState("password");

  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    type: "",
    redirect: "",
  });

  useEffect(() => {
    gsap.from(document.querySelector(".settings_detail"), {
      opacity: 0,
      duration: 2,
    });
  }, []);

  const save = async () => {
    if (fields.password && fields.password2 && fields.username) {
      if (fields.password === fields.password2) {
        const res = await window.api.createUser(fields);

        if (res && res.text === "User added successfully!") {
          setPopUp({
            active: true,
            message: Langs[lang].notifications.user_saved,
            type: "success",
            redirect: "",
          });

          setInputType("password");

          // re-initiate state after user save
          setFields({
            username: "",
            password: "",
            password2: "",
          });
        }
      } else {
        setPopUp({
          active: true,
          message: Langs[lang].notifications.passwords_not_matching,
          type: "error",
          redirect: "",
        });
      }
    } else {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.empty_fields,
        type: "error",
        redirect: "",
      });
    }
  };

  const toggleType = () => {
    input_type === "password" ? setInputType("text") : setInputType("password");
  };

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="settings_detail"
      >
        <h1>{Langs[lang].Settings.Users.add_user[0]}</h1>

        <div className="settings_controls">
          <div className="add_user_input_container">
            <input
              placeholder={Langs[lang].Settings.Users.add_user[1]}
              type="text"
              name="username"
              value={fields.username}
              onChange={(e) =>
                setFields({ ...fields, [e.target.name]: e.target.value })
              }
            />

            <div className="add_user_passwords_container">
              <input
                placeholder={Langs[lang].Settings.Users.add_user[2]}
                type={input_type}
                name="password"
                value={fields.password}
                onChange={(e) =>
                  setFields({ ...fields, [e.target.name]: e.target.value })
                }
              />
              <input
                placeholder={Langs[lang].Settings.Users.add_user[3]}
                type={input_type}
                name="password2"
                value={fields.password2}
                onChange={(e) =>
                  setFields({ ...fields, [e.target.name]: e.target.value })
                }
              />
            </div>

            {input_type === "password" ? (
              <AiFillEye style={{ cursor: "pointer" }} onClick={toggleType} />
            ) : (
              <AiFillEyeInvisible
                style={{ cursor: "pointer" }}
                onClick={toggleType}
              />
            )}
          </div>
          <button className={`add_user_save_btn ${theme}`} onClick={save}>
            {Langs[lang].Settings.Users.add_user[4]}
          </button>
        </div>
      </div>

      {popUp.active ? (
        <PopUp theme={theme} popUp={popUp} setPopUp={setPopUp} />
      ) : null}
    </>
  );
};

export default AddUser;
