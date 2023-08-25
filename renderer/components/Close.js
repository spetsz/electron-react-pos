import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const Close = ({ theme, clickHandler }) => {
  const style = {
    color:
      theme === "dark_theme"
        ? "rgb(24, 23, 23)"
        : theme === "red_theme"
        ? "#c84843"
        : theme === "green_theme"
        ? "#36AE7C"
        : "#187498",
  };

  return (
    <AiFillCloseCircle
      className="close_btn"
      style={style}
      onClick={() => clickHandler(false)}
    />
  );
};

export default Close;
