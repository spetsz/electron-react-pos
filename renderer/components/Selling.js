import React, { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import DigitalScreen from "./DigitalScreen";
import { Ctx } from "../context/Ctx";
import Langs from "./Languages";
import { gsap } from "gsap";
import {
  AiFillPlusSquare,
  AiFillMinusSquare,
  AiFillCheckSquare,
} from "react-icons/ai";
import { TiCancel } from "react-icons/ti";
import { RiUserShared2Fill } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import PopUp from "./PopUp";
import Close from "./Close";
import useScanDetection from "use-scan-detection";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
    },
  },
};

const Selling = () => {
  const { DEAL_NUMBER, theme, setDEAL_NUMBER, total, lang, USER } =
    useContext(Ctx);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [credit, setCredit] = useState(false);
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [client, setClient] = useState("");
  const [manualValue, setManualValue] = useState(false);
  const [manualValueFields, setManualValueFields] = useState({});
  const [firstLoad, setFirstLoad] = useState(true);
  const [lastPressedKey, setLastPressedKey] = useState("");
  const [calculator, setCalculator] = useState(false);
  const [change, setChange] = useState(0);
  const [canCreditClients, setCanCreditClients] = useState(false);
  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    redirect: "",
    type: "",
  });

  const calculateChange = () => {
    setChange(document.querySelector(".calculator_input").value - total);
    document.querySelector(".calculator_output").style.display = "block";
  };

  const columns = [
    {
      name: Langs[lang].Cash.products_list_columns[0],
      selector: (row) => row.name,
    },
    {
      name: Langs[lang].Cash.products_list_columns[1],
      selector: (row) => row.quantity,
    },
    {
      name: Langs[lang].Cash.products_list_columns[2],
      selector: (row) => row.price,
    },
  ];

  const checkCanCreditClients = async () => {
    const privilege = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "CREDIT_CLIENTS",
    });
    setCanCreditClients(privilege.granted);
  };

  useEffect(() => {
    checkCanCreditClients();

    const filterProduct = async () => {
      const res = await window.api.filterProduct(search);

      if (res && res.length > 0) {
        setSuggestions(res);

        if (search === res[0].name || search == res[0].barcode) {
          const prod = {
            name: res[0].name,
            quantity: 1,
            price: res[0].price,
            image: res[0].image,
            stock: res[0].stock,
            barcode: res[0].barcode,
            alert: res[0].alert,
            profit: res[0].profit,
          };

          if (productList.filter((p) => p.name === res[0].name).length > 0) {
            const prods = productList.map((prod) =>
              prod.name === res[0].name
                ? {
                    name: prod.name,
                    quantity: prod.quantity + 1,
                    price: prod.price,
                    image: prod.image,
                    stock: prod.stock,
                    barcode: prod.barcode,
                    alert: prod.alert,
                    profit: prod.profit,
                  }
                : prod
            );

            setProductList(prods);
          } else {
            setProductList((prev) => {
              return [...prev, prod];
            });
          }

          setSearch("");
          setSuggestions([]);
          setSelectedProduct(prod);
        }
      }
    };

    if (firstLoad) {
      gsap.from(document.querySelector(".cash_register_container"), {
        opacity: 0,
        duration: 1.2,
      });

      setFirstLoad(false);
    }

    if (search.length > 0) {
      filterProduct();
    } else {
      setSuggestions([]);
    }

    const handleKeyDown = async (e) => {
      setLastPressedKey(e.key);

      // Calculator shortcut
      if (lastPressedKey === "Alt" && e.key.toLowerCase() === "c") {
        if (productList.length > 0) {
          setCalculator(true);
          setLastPressedKey("");
        }

        // Validating deals
      } else if (lastPressedKey === "Shift" && e.key === "Enter") {
        if (productList.length > 0) {
          await validate();
          setLastPressedKey("");
        }

        // Introduce a manual value
      } else if (lastPressedKey === "Alt" && e.key.toLowerCase() === "m") {
        setManualValue(true);
        setLastPressedKey("");
      } else if (lastPressedKey === "Alt" && e.key.toLowerCase() === "x") {
        if (productList.length > 0) {
          if (canCreditClients) {
            setCredit(true);
            setLastPressedKey("");
          } else {
            setPopUp({
              active: true,
              type: "error",
              message: Langs[lang].notifications.access_denied,
              redirect: "",
            });
          }
        }
      }

      //  Quit calculator
      if (e.key === "Escape" && calculator) {
        setCalculator(false);

        //  Quit adding manual value
      } else if (e.key === "Escape" && manualValue) {
        setManualValue(false);
        setManualValueFields({});

        // Quit crediting client
      } else if (e.key === "Escape" && credit) {
        setCredit(false);
        setClient("");
      }

      // Calculating change
      if (e.key === "Enter" && calculator) {
        calculateChange();
      }

      // Calculating change
      if (e.key === "Enter" && manualValue) {
        document.getElementById("calculator_btn").click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [search, lastPressedKey, calculator]);

  useScanDetection({
    onComplete: setSearch,
    minLength: 13, // EAN13
  });

  const clicked = (row) => {
    setSelectedProduct(row);
  };

  const addQnty = () => {
    if (selectedProduct.name) {
      if (
        productList.find((prod) => prod.name === selectedProduct.name).stock < 1
      ) {
        setPopUp({
          active: true,
          type: "info",
          message: Langs[lang].notifications.stock_limit,
          redirect: "",
        });
      } else {
        setProductList(
          productList.map((prod) => {
            if (prod.name === selectedProduct.name) {
              return {
                name: prod.name,
                price: prod.price,
                quantity: prod.quantity + 1,
                barcode: prod.barcode,
                image: prod.image,
                stock: prod.stock - 1,
                alert: prod.alert,
                profit: prod.profit,
              };
            } else {
              return prod;
            }
          })
        );
      }
    }
  };

  const reduceQnty = () => {
    if (selectedProduct.name) {
      if (
        productList.find((prod) => prod.name === selectedProduct.name)
          .quantity <= 1
      ) {
        setProductList(
          productList.filter((prod) => prod.name != selectedProduct.name)
        );
        setSelectedProduct({});
      } else {
        setProductList(
          productList.map((prod) => {
            if (prod.name === selectedProduct.name) {
              return {
                name: prod.name,
                price: prod.price,
                quantity: prod.quantity - 1,
                barcode: prod.barcode,
                image: prod.image,
                stock: prod.stock + 1,
                alert: prod.alert,
                profit: prod.profit,
              };
            } else {
              return prod;
            }
          })
        );
      }
    }
  };

  const cancel = () => {
    setProductList([]);
    setSelectedProduct({});
    setSuggestions([]);
    setSearch("");
    setCalculator(false);
  };

  const addManualValue = () => {
    setManualValue((prev) => !prev);
  };

  const validate = async () => {
    if (productList.length > 0) {
      window.api.processTransaction({
        products_list: productList,
        total,
        user: USER.username,
      });

      cancel();

      setDEAL_NUMBER(await window.api.getTransactionsNumber());
      setCalculator(false);
    }
  };

  const creditClient = async () => {
    if (selectedClient.name) {
      const clientFields = {
        name: selectedClient.name,
        phone: selectedClient.phone,
        debt: selectedClient.debt + total,
        transactions_all_time: selectedClient.transactions_all_time + total,
        transactions_last_month: selectedClient.transactions_last_month + total,
        products: productList,
      };

      const res = await window.api.editClient(clientFields);
      if (res.text) {
        setPopUp({
          active: true,
          type: "success",
          message: Langs[lang].notifications.updated,
          redirect: "",
        });

        setCredit(false);
        setClient("");
        await validate();
      } else {
        setPopUp({
          active: true,
          type: "error",
          message: Langs[lang].notifications.cant_credit_client,
          redirect: "",
        });
      }
    } else {
      setPopUp({
        active: true,
        type: "error",
        message: Langs[lang].notifications.client_first,
        redirect: "",
      });
    }
  };

  const clientSearchHandler = async (e) => {
    if (e.target.value != "") {
      const res = await window.api.filterClient(e.target.value);
      if (res) {
        setClientSuggestions(res);
      }
    } else {
      setClientSuggestions([]);
    }
  };

  return (
    <>
      <div
        className="cash_register_container"
        style={{
          opacity:
            calculator || manualValue || credit || popUp.active ? 0.5 : 1,
        }}
      >
        <div className="cash_register_left">
          <DataTable
            data={productList}
            columns={columns}
            className="cash_register_left_list"
            customStyles={customStyles}
            responsive
            striped
            highlightOnHover
            pointerOnHover
            onRowClicked={(row) => clicked(row)}
          />

          <input
            value={search}
            dir={lang === "ar" ? "rtl" : "ltr"}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={Langs[lang].Cash.product_search_placeholder}
            autoFocus
            className="cash_register_input"
          />
          {suggestions.length > 0
            ? suggestions.map((prod, i) => {
                return (
                  <div
                    onClick={() => {
                      const product = {
                        name: prod.name,
                        quantity: 1,
                        price: prod.price,
                        image: prod.image,
                        stock: prod.stock - 1,
                        barcode: prod.barcode,
                        alert: prod.alert,
                        profit: prod.profit,
                      };

                      setSelectedProduct(prod);
                      setSearch("");
                      setSuggestions([]);

                      if (
                        productList.filter((p) => p.name === prod.name).length >
                        0
                      ) {
                        const prods = productList.map((prod) =>
                          prod.name === product.name
                            ? {
                                name: prod.name,
                                quantity: prod.quantity + 1,
                                price: prod.price,
                                image: prod.image,
                                stock: prod.stock - 1,
                                barcode: prod.barcode,
                                alert: prod.alert,
                                profit: prod.profit,
                              }
                            : prod
                        );

                        setProductList(prods);
                      } else {
                        setProductList((prev) => {
                          return [...prev, product];
                        });
                      }
                    }}
                    className="suggestions"
                    key={i}
                  >
                    {prod.name}
                  </div>
                );
              })
            : null}

          <div className="cash_register_left_image">
            <img src={selectedProduct.image} />
          </div>
        </div>

        <div
          className="cash_register_right"
          style={{ opacity: credit ? "0.5" : "1" }}
        >
          <DigitalScreen
            selectedProduct={selectedProduct}
            productList={productList}
            DEAL_NUMBER={DEAL_NUMBER}
          />

          <div className="cash_register_controls">
            <div className="control">
              <AiFillPlusSquare
                style={{ cursor: "pointer" }}
                onClick={addQnty}
              />
              <div className="control_text">{Langs[lang].Cash.controls[0]}</div>
            </div>

            <div className="control" style={{ color: "#c84843" }}>
              <AiFillMinusSquare
                style={{ cursor: "pointer" }}
                onClick={reduceQnty}
              />
              <div className="control_text">{Langs[lang].Cash.controls[1]}</div>
            </div>

            <div className="control" style={{ color: "#c84843" }}>
              <TiCancel style={{ cursor: "pointer" }} onClick={cancel} />
              <div className="control_text">{Langs[lang].Cash.controls[2]}</div>
            </div>

            <div className="control" style={{ color: "#187498" }}>
              <MdLibraryAdd
                style={{ cursor: "pointer" }}
                onClick={addManualValue}
              />
              <div className="control_text">{Langs[lang].Cash.controls[3]}</div>
            </div>

            <div className="control">
              <AiFillCheckSquare
                style={{ cursor: "pointer" }}
                onClick={() => validate()}
              />
              <div className="control_text">{Langs[lang].Cash.controls[4]}</div>
            </div>

            <div className="control">
              <RiUserShared2Fill
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  if (productList.length > 0) {
                    if (canCreditClients) {
                      setCredit(true);
                    } else {
                      setPopUp({
                        active: true,
                        type: "error",
                        message: Langs[lang].notifications.access_denied,
                        redirect: "",
                      });
                    }
                  }
                }}
              />
              <div className="control_text">{Langs[lang].Cash.controls[5]}</div>
            </div>

            {
              // Print ticket disabled for now
              /*  
               <div className='control' style={{color : "#187498"}}>
              <BsFillPrinterFill style={{cursor : "pointer"}}/>
              <div className='control_text'>{Langs[lang].Cash.controls[6]}</div>

            </div>
              */
            }
          </div>
        </div>
      </div>

      {calculator && (
        <div className={`calculator ${theme}`}>
          <Close theme={theme} clickHandler={setCalculator} />

          <input
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="calculator_input"
            autoFocus
            type="number"
            placeholder={Langs[lang].Cash.calculator.input_placeholder}
          />

          <button
            className={`calculator_btn ${theme}`}
            onClick={calculateChange}
          >
            {Langs[lang].Cash.calculator.button}
          </button>

          <div className="calculator_output">
            {change > 0 && <span>{change} DZD</span>}
          </div>
        </div>
      )}

      {manualValue && (
        <div className={`calculator ${theme}`}>
          <Close theme={theme} clickHandler={setManualValue} />

          <input
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="calculator_input"
            autoFocus
            type="text"
            value={manualValueFields.name}
            onChange={(e) =>
              setManualValueFields({
                ...manualValueFields,
                name: e.target.value,
              })
            }
            placeholder={Langs[lang].Cash.add_manual.name_placeholder}
          />
          <input
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="calculator_input"
            type="number"
            value={manualValueFields.price}
            onChange={(e) =>
              setManualValueFields({
                ...manualValueFields,
                price: e.target.value,
              })
            }
            placeholder={Langs[lang].Cash.add_manual.value_placeholder}
          />

          <button
            id="calculator_btn"
            className={`calculator_btn ${theme}`}
            onClick={() => {
              if (manualValueFields.name && manualValueFields.price) {
                setProductList((prev) => [
                  ...prev,
                  {
                    name: manualValueFields.name,
                    price: manualValueFields.price,
                    quantity: 1,
                  },
                ]);

                setManualValue(false);
                setManualValueFields({});
              } else {
                setPopUp({
                  active: true,
                  type: "error",
                  message: Langs[lang].notifications.empty_fields,
                  redirect: "",
                });
              }
            }}
          >
            {Langs[lang].Cash.add_manual.button}
          </button>
        </div>
      )}

      {credit ? (
        <div
          className={`credit_client ${theme}`}
          style={{ height: clientSuggestions.length > 0 ? "350px" : "200px" }}
        >
          <Close theme={theme} clickHandler={setCredit} />

          <input
            dir={lang === "ar" ? "rtl" : "ltr"}
            autoFocus
            type="text"
            value={client}
            onChange={(e) => {
              setClient(e.target.value);
              clientSearchHandler(e);
            }}
            placeholder={Langs[lang].Cash.credit.client_name_placeholder}
          />

          <button className={`${theme}`} onClick={creditClient}>
            {Langs[lang].Cash.credit.button}
          </button>

          <div
            className="suggestions_container"
            style={{ display: clientSuggestions.length > 0 ? "block" : "none" }}
          >
            {clientSuggestions.length > 0
              ? clientSuggestions.map((client, i) => {
                  return (
                    <div
                      className="suggestions"
                      key={i}
                      onClick={() => {
                        setSelectedClient(client);
                        setClientSuggestions([]);
                        setClient(client.name);
                      }}
                    >
                      {client.name}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      ) : null}

      {popUp && popUp.active === true ? (
        <PopUp setPopUp={setPopUp} popUp={popUp} theme={theme} />
      ) : null}
    </>
  );
};

export default Selling;
