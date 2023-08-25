import React from "react";
const Spinner = ({ theme }) => {
  return (
    <div className="lds_ripple">
      <div className={`spinner_div ${theme}`}></div>
      <div className={`spinner_animated ${theme}`}></div>
    </div>
  );
};

export default Spinner;
