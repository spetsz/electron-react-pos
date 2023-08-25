import React, { useState } from "react";
import Langs from "./Languages";
import PopUp from "./PopUp";
import GoBack from "./GoBack";

const AddClient = ({ allClients, theme, lang }) => {
  const [clientFields, setClientFields] = useState({
    name: "",
    phone: "",
    debt: "",
    transactions_all_time: "",
    transactions_last_month: "",
  });

  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    type: "",
    redirect: "",
  });

  const { name, phone, debt, transactions_all_time, transactions_last_month } =
    clientFields;

  const add = async (e) => {
    e.preventDefault();

    if ((name, phone, debt, transactions_all_time, transactions_last_month)) {
      const res = await window.api.addClient(clientFields);
      if (res && res.errorType === "Duplicate") {
        setPopUp({
          active: true,
          message: Langs[lang].notifications.duplicate_clients,
          type: "error",
          redirect: "",
        });
      } else {
        setPopUp({
          active: true,
          message: Langs[lang].notifications.client_saved,
          type: "success",
          redirect: "/home/clients",
        });

        await allClients();
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

  return (
    <>
      <div className="modify_product_container">
        <GoBack theme={theme} />
        <div dir={lang === "ar" ? "rtl" : "ltr"} className="modify_client_form">
          <label>{Langs[lang].Clients.modify_clients[0]}</label>
          <input
            autoFocus
            style={{ cursor: "text" }}
            value={name}
            name="name"
            onChange={(e) =>
              setClientFields({
                ...clientFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Clients.modify_clients[0]}
            className="form_input"
          />

          <label>{Langs[lang].Clients.modify_clients[1]}</label>
          <input
            style={{ cursor: "text" }}
            value={phone}
            type="number"
            name="phone"
            onChange={(e) =>
              setClientFields({
                ...clientFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Clients.modify_clients[1]}
            className="form_input"
          />

          <label>{Langs[lang].Clients.modify_clients[2]}</label>
          <input
            value={debt}
            type="number"
            name="debt"
            onChange={(e) =>
              setClientFields({
                ...clientFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Clients.modify_clients[2]}
            className="form_input"
          />

          <label>{Langs[lang].Clients.modify_clients[3]}</label>
          <input
            value={transactions_all_time}
            type="number"
            name="transactions_all_time"
            onChange={(e) =>
              setClientFields({
                ...clientFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Clients.modify_clients[3]}
            className="form_input"
          />

          <label>{Langs[lang].Clients.modify_clients[4]}</label>
          <input
            value={transactions_last_month}
            name="transactions_last_month"
            type="number"
            onChange={(e) =>
              setClientFields({
                ...clientFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Clients.modify_clients[4]}
            className="form_input"
          />

          <button
            className={`form_button ${theme}`}
            onClick={(e) => add(e)}
            type="button"
          >
            {Langs[lang].Clients.modify_clients[6]}
          </button>
        </div>
      </div>

      {popUp.active ? (
        <PopUp setPopUp={setPopUp} theme={theme} popUp={popUp} />
      ) : null}
    </>
  );
};

export default AddClient;
