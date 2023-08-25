import React, { useContext, useState } from "react";
import { Ctx } from "../context/Ctx";
import { Link, useNavigate } from "react-router-dom";
import Clock from "react-live-clock";
import Langs from "./Languages";
import PopUp from "./PopUp";

import {
  FaCashRegister,
  FaWarehouse,
  FaUsers,
  FaUserAlt,
  FaUserTie,
} from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { IoSettings } from "react-icons/io5";

const Nav = () => {
  const { USER, setUSER, theme, lang } = useContext(Ctx);
  const [popUp, setPopUp] = useState({
    type: "",
    message: "",
    redirect: "",
    active: false,
  });

  const router = useNavigate();

  const exit = () => {
    window.api.command({
      type: "resize",
      payload: {
        width: 400,
        height: 450,
      },
    });
    setUSER({});
  };

  const checkPrivilegeAndRedirect = (privilege, route) => {
    if (USER[privilege] === 1) {
      router(route);
    } else {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.access_denied,
        type: "info",
        redirect: "",
      });
    }
  };

  const appliedTheme = "home_nav " + theme;

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : null }}
        className={appliedTheme}
      >
        <div className="home_nav_left">
          <div className="home_nav_avatar">
            {USER.username === "Admin" ? (
              <FaUserTie className="home_icon" />
            ) : (
              <FaUserAlt className="home_icon" />
            )}

            <h1>{USER.username}</h1>
          </div>

          <div className="home_nav_date">
            <Clock
              className="home_full_date"
              format={"ddd DD/MM/YYYY"}
              ticking={true}
              timezone={"Etc/GMT-1"}
            />

            <Clock
              className="home_full_time"
              format={"HH:mm:ss A"}
              ticking={true}
              timezone={"Etc/GMT-1"}
            />
          </div>
        </div>

        <div className="home_nav_right">
          <div className="home_nav_right_tools">
            <a
              onClick={() => checkPrivilegeAndRedirect("SELL", "/home/selling")}
            >
              <FaCashRegister className="tool_icon" />
              <div>{Langs[lang].Navigation[0]}</div>
            </a>
          </div>

          <div className="home_nav_right_tools">
            <a
              onClick={() =>
                checkPrivilegeAndRedirect("ACCESS_INVENTORY", "/home/inventory")
              }
            >
              <FaWarehouse className="tool_icon" />
              <div>{Langs[lang].Navigation[1]}</div>
            </a>
          </div>

          <div className="home_nav_right_tools">
            <a
              onClick={() =>
                checkPrivilegeAndRedirect(
                  "ACCESS_TRANSACTIONS",
                  "/home/transactions"
                )
              }
            >
              <GiReceiveMoney className="tool_icon" />
              <div>{Langs[lang].Navigation[2]}</div>
            </a>
          </div>

          <div className="home_nav_right_tools">
            <a
              onClick={() =>
                checkPrivilegeAndRedirect("ACCESS_CLIENTS", "/home/clients")
              }
            >
              <FaUsers className="tool_icon" />
              <div>{Langs[lang].Navigation[3]}</div>
            </a>
          </div>

          <div className="home_nav_right_tools">
            <a
              onClick={() =>
                checkPrivilegeAndRedirect("ACCESS_SETTINGS", "/home/settings")
              }
            >
              <IoSettings className="tool_icon" />
              <div>{Langs[lang].Navigation[4]}</div>
            </a>
          </div>

          <div className="home_nav_right_tools">
            <Link to="/home/info">
              <BsFillInfoCircleFill className="tool_icon" />
              <div>{Langs[lang].Navigation[5]}</div>
            </Link>
          </div>

          <div className="home_nav_right_tools" onClick={() => exit()}>
            <Link to="/">
              <ImExit className="tool_icon" />
              <div>{Langs[lang].Navigation[6]}</div>
            </Link>
          </div>
        </div>
      </div>

      {popUp.active ? (
        <PopUp theme={theme} setPopUp={setPopUp} popUp={popUp} />
      ) : null}
    </>
  );
};

export default Nav;
