import React, { useEffect } from "react";
import { BsInfoCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PopUp = ({ popUp, theme, setPopUp }) => {
  const { message, type, redirect } = popUp;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        document.querySelector(".popup_accept_btn").click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const router = useNavigate();

  const redirectTo = () => {
    if (redirect.length > 0) {
      router(redirect);
    } else {
      setPopUp({
        active: false,
        redirect: "",
        message: "",
        type: "",
      });
    }
  };

  return (
    <div className={`popup_container ${theme}`}>
      {type === "success" ? (
        <BsFillCheckCircleFill
          style={{ color: "#4aa74a" }}
          className="popup_icon"
        />
      ) : type === "info" ? (
        <BsInfoCircleFill
          style={{
            color:
              theme === "dark_theme"
                ? "rgb(24, 23, 23)"
                : theme === "red_theme"
                ? "#c84843"
                : theme === "blue_theme"
                ? "#187498"
                : theme === "green_theme"
                ? "#36AE7C"
                : "inherit",
          }}
          className="popup_icon"
        />
      ) : type === "error" ? (
        <IoWarning style={{ color: "#db2e2e" }} className="popup_icon" />
      ) : null}

      <div className="popup_message">{message}</div>
      <button onClick={redirectTo} className={`popup_accept_btn ${theme}`}>
        Okay!
      </button>
    </div>
  );
};

export default PopUp;
