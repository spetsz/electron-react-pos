import React, { useEffect, useContext } from "react";
import Clock from "react-live-clock";
import { Ctx } from "../context/Ctx";
import { RiAlarmWarningFill } from "react-icons/ri";
import Langs from "./Languages";

const f = new Intl.NumberFormat("en-us", {
  currency: "DZD",
  style: "currency",
});

const DigitalScreen = ({ selectedProduct, productList, DEAL_NUMBER }) => {
  const { name, price, barcode } = selectedProduct;
  const { total, setCost, lang, theme } = useContext(Ctx);

  useEffect(() => {
    let cost = 0;
    productList.forEach((prod) => {
      cost += prod.price * prod.quantity;
    });

    setCost(cost);
  }, [productList, selectedProduct, DEAL_NUMBER]);

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="digital_screen">
      <div className="digital_screen_announcement">
        <marquee scrollamount="3" className={theme} direction="right">
          <Clock
            format={"dddd DD MMMM YYYY HH:mm:ss A"}
            ticking
            timezone={"Etc/GMT-2"}
          />
        </marquee>
      </div>

      <div className="digital_screen_text">
        {Langs[lang].Cash.digital_screen.text_fields[0]} :{" "}
        <span className="text_white">{DEAL_NUMBER}</span>
      </div>
      <div
        className="digital_screen_text"
        style={{ display: "flex", alignItems: "center" }}
      >
        {Langs[lang].Cash.digital_screen.text_fields[1]} :
        <span className="text_white">{name}</span>
        {selectedProduct.alert >= selectedProduct.stock ? (
          <div style={{ margin: "0", padding: "0" }}>
            <RiAlarmWarningFill
              className="flicker"
              style={{ color: "yellow", margin: "0", padding: "0" }}
            />
          </div>
        ) : null}
      </div>
      <div className="digital_screen_text">
        {Langs[lang].Cash.digital_screen.text_fields[2]} :{" "}
        <span className="text_white">{price} (DZD)</span>
      </div>
      <div className="digital_screen_text">
        {Langs[lang].Cash.digital_screen.text_fields[3]} :{" "}
        <span className="text_white barcode">{barcode}</span>
      </div>
      <div className="digital_screen_text">
        {Langs[lang].Cash.digital_screen.text_fields[4]} :{" "}
        <span className="text_white">
          {Array.isArray(productList) && selectedProduct.name
            ? productList.find((prod) => prod.name === selectedProduct.name)
                .stock
            : null}
        </span>
      </div>

      <div className={`digital_screen_total ${theme}`}>
        <div className="digital_screen_text" style={{ height: "fit-content" }}>
          {Langs[lang].Cash.digital_screen.text_fields[5]} :{" "}
        </div>

        {total && f.format(total)}
      </div>

      <div
        className="digital_screen_announcement"
        style={{ position: "absolute", bottom: "5px" }}
      >
        <marquee scrollamount="3" className={theme} direction="right">
          &#10084; {Langs[lang].Cash.digital_screen.moving_bottom_text} &#10084;
        </marquee>
      </div>
    </div>
  );
};

export default DigitalScreen;
