import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const GoBack = ({ theme }) => {
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

  const router = useNavigate();

  return (
    <IoArrowBackCircleSharp
      className="goback_btn"
      style={style}
      onClick={() => router(-1)}
    />
  );
};

export default GoBack;
