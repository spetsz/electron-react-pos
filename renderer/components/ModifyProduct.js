import React, { useState, useEffect } from "react";
import Langs from "./Languages";
import PopUp from "./PopUp";
import GoBack from "./GoBack";

const ModifyProduct = ({ product, allProducts, theme, lang }) => {
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
    type: "",
    message: "",
    redirect: "",
  });

  useEffect(() => {
    if (product[0].name) {
      setProductFields({
        name: product[0].name,
        price: product[0].price,
        barcode: product[0].barcode,
        stock: product[0].stock,
        alert: product[0].alert,
        image: product[0].image,
        buy_price: product[0].price - product[0].profit,
      });
    }
  }, []);

  const { name, barcode, stock, alert, price, image, buy_price } =
    productFields;

  const modify = async (e) => {
    if (name && barcode && stock && alert && price) {
      e.preventDefault();
      const res = await window.api.updateProduct(productFields);

      if (res) {
        setPopUp({
          active: true,
          message: Langs[lang].notifications.updated,
          type: "success",
          redirect: "/home/inventory",
        });

        allProducts();
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

  const fileChanged = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setProductFields({ ...productFields, image: reader.result });
    };
    reader.readAsDataURL(image);
  };

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="modify_product_container"
      >
        <GoBack theme={theme} />

        <div className="modify_product_left">
          <label>{Langs[lang].Inventory.products_table_columns[0]}</label>

          <input
            disabled
            style={{ cursor: "not-allowed" }}
            value={name}
            name="name"
            placeholder={Langs[lang].Inventory.products_table_columns[0]}
            className="form_input"
          />

          <label>{Langs[lang].Inventory.products_table_columns[1]}</label>
          <input
            disabled
            style={{ cursor: "not-allowed" }}
            value={barcode}
            type="number"
            name="barcode"
            placeholder={Langs[lang].Inventory.products_table_columns[1]}
            className="form_input"
          />

          <label>{Langs[lang].Inventory.products_table_columns[4]}</label>
          <input
            value={stock}
            name="stock"
            type="number"
            min={0}
            onChange={(e) =>
              setProductFields({
                ...productFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Inventory.products_table_columns[4]}
            className="form_input"
          />

          <label>{Langs[lang].Inventory.products_table_columns[5]}</label>
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

          <label>{Langs[lang].Inventory.products_table_columns[2]}</label>
          <input
            value={price}
            type="number"
            name="price"
            onChange={(e) =>
              setProductFields({
                ...productFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Inventory.products_table_columns[2]}
            className="form_input"
          />

          <label>{Langs[lang].Inventory.products_table_columns[3]}</label>
          <input
            value={buy_price}
            type="number"
            name="buy_price"
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

        <button className={theme} onClick={(e) => modify(e)} type="button">
          {Langs[lang].Inventory.products_table_columns[6]}
        </button>
      </div>

      {popUp && popUp.active ? (
        <PopUp theme={theme} popUp={popUp} setPopUp={setPopUp} />
      ) : null}
    </>
  );
};

export default ModifyProduct;
