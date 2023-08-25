import React, { useState, useEffect } from "react";
import Langs from "./Languages";
import PopUp from "./PopUp";
import GoBack from "./GoBack";

const ModifyClient = ({ client, allClients, lang, theme }) => {
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
    redirect: "",
    type: "",
  });

  useEffect(() => {
    setClientFields(client[0]);
  }, []);

  const { name, phone, debt, transactions_all_time, transactions_last_month } =
    clientFields;

  const modify = async (e) => {
    e.preventDefault();
    const res = await window.api.editClient(clientFields);
    if (res) {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.updated,
        type: "success",
        redirect: "/home/clients",
      });
    }
    allClients();
  };

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        className="modify_product_container"
      >
        <GoBack theme={theme} />

        <div dir={lang === "ar" ? "rtl" : "ltr"} className="modify_client_form">
          <label>{Langs[lang].Clients.modify_clients[0]}</label>
          <input
            disabled
            value={name}
            name="name"
            placeholder={Langs[lang].Clients.modify_clients[0]}
            className="form_input"
          />

          <label>{Langs[lang].Clients.modify_clients[1]}</label>
          <input
            disabled
            value={phone}
            name="phone"
            placeholder={Langs[lang].Clients.modify_clients[1]}
            className="form_input"
          />

          <label>{Langs[lang].Clients.modify_clients[2]}</label>

          <input
            value={debt}
            name="debt"
            type="number"
            min={0}
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
            name="transactions_all_time"
            type="number"
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
            type="number"
            name="transactions_last_month"
            onChange={(e) =>
              setClientFields({
                ...clientFields,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={Langs[lang].Clients.modify_clients[4]}
            className="form_input"
          />
        </div>

        <button
          className={`form_button ${theme}`}
          onClick={(e) => modify(e)}
          type="button"
        >
          {Langs[lang].Clients.modify_clients[5]}
        </button>
      </div>

      {popUp.active ? (
        <PopUp theme={theme} popUp={popUp} setPopUp={setPopUp} />
      ) : null}
    </>
  );
};

export default ModifyClient;
