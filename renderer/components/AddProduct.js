import React, { useState } from "react";
import Langs from "./Languages";
import PopUp from "./PopUp";
import GoBack from "./GoBack";
import useScanDetection from "use-scan-detection";

const AddProduct = ({ allProducts, theme, lang }) => {
  const [productFields, setProductFields] = useState({
    name: "",
    barcode: "",
    stock: "",
    alert: "",
    price: "",
    buy_price: "",
    image: "",
  });

  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    redirect: "",
    type: "",
  });

  useScanDetection({
    onComplete: (code) => {
      setProductFields({ ...productFields, barcode: code });
    },
    minLength: 13, // EAN13
  });

  const add = async (e) => {
    if ((name, barcode, stock, alert, price, buy_price)) {
      e.preventDefault();

      const profit = price - buy_price;

      const res = await window.api.addProduct({
        name: productFields.name,
        barcode: productFields.barcode,
        stock: productFields.stock,
        alert: productFields.alert,
        price: productFields.price,
        profit,
        image: productFields.image,
      });

      console.log(res);

      if (res && res.text === "Product added successfully!") {
        setPopUp(
          (prev) =>
            (prev = {
              active: true,
              message: Langs[lang].notifications.product_saved,
              type: "success",
              redirect: "/home/inventory",
            })
        );

        allProducts();
      } else if (res && res.text) {
        setPopUp(
          (prev) =>
            (prev = {
              active: true,
              message: Langs[lang].notifications.duplicate_product,
              type: "error",
              redirect: "",
            })
        );
      }
    } else {
      setPopUp(
        (prev) =>
          (prev = {
            type: "error",
            message: Langs[lang].notifications.empty_fields,
            active: true,
            redirect: "",
          })
      );
    }
  };

  const fileChanged = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setProductFields({ ...productFields, image: reader.result });
    };
    reader.readAsDataURL(image);
  };

  const { name, barcode, stock, alert, price, buy_price, image } =
    productFields;

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        className="modify_product_container"
      >
        <GoBack theme={theme} />

        <div
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="modify_product_left"
        >
          <input
            autoFocus
            value={name}
            name="name"
            onChange={(e) =>
              setProductFields({
                ...productFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Inventory.products_table_columns[0]}
            className="form_input"
          />

          <input
            value={barcode}
            type="number"
            name="barcode"
            onChange={(e) =>
              setProductFields({
                ...productFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Inventory.products_table_columns[1]}
            className="form_input"
          />

          <input
            value={stock}
            type="number"
            min={0}
            name="stock"
            onChange={(e) =>
              setProductFields({
                ...productFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Inventory.products_table_columns[4]}
            className="form_input"
          />

          <input
            value={alert}
            name="alert"
            type="number"
            onChange={(e) =>
              setProductFields({
                ...productFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Inventory.products_table_columns[5]}
            className="form_input"
          />

          <input
            value={price}
            name="price"
            type="number"
            onChange={(e) =>
              setProductFields({
                ...productFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Inventory.products_table_columns[2]}
            className="form_input"
          />

          <input
            value={buy_price}
            name="buy_price"
            type="number"
            onChange={(e) =>
              setProductFields({
                ...productFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Inventory.products_table_columns[3]}
            className="form_input"
          />
        </div>

        <div className="modify_product_right">
          <img src={image} />

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => fileChanged(e)}
          />
        </div>

        <button className={`${theme}`} onClick={(e) => add(e)} type="button">
          {Langs[lang].Inventory.nav_buttons[0]}
        </button>
      </div>

      {popUp && popUp.active === true ? (
        <PopUp setPopUp={setPopUp} popUp={popUp} theme={theme} />
      ) : null}
    </>
  );
};

export default AddProduct;
