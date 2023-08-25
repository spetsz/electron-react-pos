import React, { useContext, useState, useEffect } from "react";
import { Ctx } from "../context/Ctx";
import PopUp from "./PopUp";
import { gsap } from "gsap";
import Langs from "./Languages";

const Info = () => {
  const { theme, lang } = useContext(Ctx);

  const [fields, setFields] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [popUp, setPopUp] = useState({
    active: false,
    redirect: "",
    type: "",
    message: "",
  });

  useEffect(() => {
    gsap.from(document.querySelector(".info_container"), {
      opacity: 0,
      duration: 1.2,
    });
  }, []);

  const send = async (e) => {
    e.preventDefault();

    const connected = await window.api.checkInternet();

    if (name && phone && message) {
      if (connected) {
        const res = await window.api.sendMessage(fields);

        if (res && res.received === true) {
          setPopUp({
            active: true,
            message: Langs[lang].notifications.message_sent,
            type: "success",
            redirect: "",
          });

          setFields({
            name: "",
            phone: "",
            email: "",
            message: "",
          });
        } else {
          setPopUp({
            active: true,
            message: Langs[lang].notifications.something_went_wrong,
            type: "info",
            redirect: "",
          });
        }
      } else {
        setPopUp({
          active: true,
          message: Langs[lang].notifications.not_connected,
          type: "error",
          redirect: "",
        });
      }
    } else {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.name_phone_message_cannot_be_empty,
        type: "error",
        redirect: "",
      });
    }
  };

  const { name, phone, message, email } = fields;

  return (
    <>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`info_container ${theme}`}
        style={{ opacity: popUp.active ? 0.5 : 1 }}
      >
        <div className="info_info">
          <div className="info_detail">
            <label>{Langs[lang].Info.developper}</label> Abdelaziz Boudabia
          </div>

          <div className="info_detail">
            <label>{Langs[lang].Info.email}</label>{" "}
            spetsz.it_solutions@gmail.com
          </div>

          <div className="info_detail">
            <label>{Langs[lang].Info.software}</label> POS Soft
          </div>

          <div className="info_detail">
            <label>{Langs[lang].Info.version}</label> 1.0.0
          </div>
        </div>

        <div className={`info_contact_form`}>
          <h1> {Langs[lang].Info.header} </h1>

          <input
            name="name"
            value={name}
            onChange={(e) =>
              setFields({ ...fields, [e.target.name]: e.target.value })
            }
            type="text"
            placeholder={Langs[lang].Info.placeholders[0]}
          />
          <input
            name="phone"
            value={phone}
            onChange={(e) =>
              setFields({ ...fields, [e.target.name]: e.target.value })
            }
            type="number"
            placeholder={Langs[lang].Info.placeholders[1]}
          />
          <input
            name="email"
            value={email}
            onChange={(e) =>
              setFields({ ...fields, [e.target.name]: e.target.value })
            }
            type="email"
            placeholder={Langs[lang].Info.placeholders[2]}
          />
          <textarea
            name="message"
            value={message}
            onChange={(e) =>
              setFields({ ...fields, [e.target.name]: e.target.value })
            }
            placeholder={Langs[lang].Info.placeholders[3]}
          ></textarea>
          <button className={theme} type="button" onClick={send}>
            {Langs[lang].Info.placeholders[4]}
          </button>
        </div>
      </div>

      {popUp.active && (
        <PopUp theme={theme} popUp={popUp} setPopUp={setPopUp} />
      )}
    </>
  );
};

export default Info;
