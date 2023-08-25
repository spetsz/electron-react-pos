import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Ctx } from "../context/Ctx";
import DataTable from "react-data-table-component";
import { AiTwotoneAlert, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { BsFillPrinterFill } from "react-icons/bs";
import { SiAddthis } from "react-icons/si";
import { FaClipboardList } from "react-icons/fa";
import { TbBookUpload } from "react-icons/tb";
import ModifyProduct from "./ModifyProduct";
import AddProduct from "./AddProduct";
import * as XLSX from "xlsx";
import Spinner from "./Spinner";
import { gsap } from "gsap";
import Langs from "./Languages";
import PopUp from "./PopUp";
import useScanDetection from "use-scan-detection";

const conditionalRowStyles = [
  {
    when: (row) => row.stock <= row.alert,
    style: {
      backgroundColor: "yellow",
    },
  },
  {
    when: (row) => row.stock == 0,
    style: {
      backgroundColor: "red",
    },
  },
];

const initState = {
  name: "",
  barcode: "",
  stock: "",
  alert: "",
  price: "",
  buy_price: "",
  image: "",
};

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "16px",
    },
  },
  cells: {
    style: {
      fontSize: "12px",
    },
  },
};

const Inventory = () => {
  const router = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(initState);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [popUp, setPopUp] = useState({
    active: false,
    type: "",
    message: "",
    redirect: "",
  });

  const { USER, theme, lang } = useContext(Ctx);

  const columns = [
    {
      name: Langs[lang].Inventory.products_table_columns[0],
      selector: (row) => row.name,
    },
    {
      name: Langs[lang].Inventory.products_table_columns[1],
      selector: (row) => row.barcode,
    },
    {
      name: Langs[lang].Inventory.products_table_columns[2],
      selector: (row) => row.price,
    },
    {
      name: Langs[lang].Inventory.products_table_columns[3],
      selector: (row) => row.buy_price,
    },
    {
      name: Langs[lang].Inventory.products_table_columns[4],
      selector: (row) => row.stock,
    },
    {
      name: Langs[lang].Inventory.products_table_columns[5],
      selector: (row) => row.alert,
    },
  ];

  useEffect(() => {
    allProducts();

    const filterProduct = async () => {
      const res = await window.api.filterProduct(search);

      if (res && res.length > 0) {
        setSuggestions(res);

        if (search === res[0].name || search == res[0].barcode) {
          setProducts(res);

          setSuggestions([]);
        }
      }
    };

    if (search && search.length > 0) {
      filterProduct();
    } else {
      setSuggestions([]);
    }

    if (firstLoad) {
      gsap.from(document.querySelector(".inventory_container"), {
        opacity: 0,
        duration: 1.2,
      });

      setFirstLoad(false);
    }
  }, [search]);

  useScanDetection({
    onComplete: setSearch,
    minLength: 13, // EAN13
  });

  const allProducts = async () => {
    setSelectedProduct(initState);
    const res = await window.api.allProducts();
    if (res && res.length > 0) {
      setProducts(res);
      setNumberOfProducts(res.length);
    } else {
      setProducts([]);
      setPopUp({
        active: true,
        redirect: "",
        type: "info",
        message: Langs[lang].notifications.db_empty,
      });
    }
  };

  const alertedProducts = async () => {
    setSelectedProduct(initState);
    const res = await window.api.allProducts();
    if (res && res.length > 0) {
      setProducts(res.filter((prod) => prod.stock <= prod.alert));
    } else {
      setPopUp({
        type: "info",
        message: Langs[lang].notifications.db_empty,
        redirect: "",
        active: true,
      });
    }
  };

  const print = async () => {
    const res = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "PRINT_INVENTORY",
    });

    if (res.granted) {
      if (products.length > 0) {
        const res = await window.api.printProductsPDF(products);

        if (res && res.text === "PDF generated successfully!") {
          setPopUp({
            active: true,
            message: Langs[lang].notifications.pdf_generated,
            redirect: "",
            type: "success",
          });
        }
      } else {
        setPopUp({
          active: true,
          type: "info",
          redirect: "",
          message: Langs[lang].notifications.nothing_to_print,
        });
      }
    } else {
      setPopUp({
        active: true,
        type: "info",
        redirect: "",
        message: Langs[lang].notifications.access_denied,
      });
    }
  };

  const importExcel = async () => {
    const res = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "IMPORT_PRODUCTS",
    });

    if (res.granted) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xls, .xlsx, .xlsm, .xlsb";
      input.click();

      input.onchange = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const sheet = XLSX.read(data).Sheets.Sheet1;
        const json = XLSX.utils.sheet_to_json(sheet);
        setLoading(true);
        console.log(json);
        const res = await window.api.addProduct(json);
        if (res && res.text === "Products imported") {
          setPopUp({
            type: "success",
            message: Langs[lang].notifications.product_import_success,
            redirect: "",
            active: true,
          });
        }
        allProducts();
        setLoading(false);
      };
    } else {
      setPopUp({
        type: "info",
        message: Langs[lang].notifications.access_denied,
        redirect: "",
        active: true,
      });
    }
  };

  const deleteProduct = async () => {
    const res = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "DELETE_PRODUCTS",
    });

    if (res.granted) {
      if (selectedProduct.length === numberOfProducts) {
        setLoading(true);
        const res = await window.api.deleteProduct("ALL");
        if (res) {
          setPopUp({
            type: "success",
            message: Langs[lang].notifications.deleted,
            redirect: "",
            active: true,
          });
          allProducts();
          setLoading(false);
        }
      } else {
        setLoading(true);
        const res = await window.api.deleteProduct(selectedProduct);
        if (res) {
          setPopUp({
            type: "success",
            message: Langs[lang].notifications.deleted,
            redirect: "",
            active: true,
          });

          allProducts();
          setLoading(false);
        }
      }
    } else {
      setPopUp({
        type: "info",
        message: Langs[lang].notifications.access_denied,
        redirect: "",
        active: true,
      });
    }
  };

  const addProduct = async () => {
    const res = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "ADD_PRODUCTS",
    });

    if (res.granted) {
      router("inventory/add");
    } else {
      setPopUp({
        type: "info",
        message: Langs[lang].notifications.access_denied,
        redirect: "",
        active: true,
      });
    }
  };

  const editProduct = async () => {
    const res = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "MODIFY_PRODUCTS",
    });

    if (res.granted) {
      router("inventory/modify");
    } else {
      setPopUp({
        type: "info",
        message: Langs[lang].notifications.access_denied,
        redirect: "",
        active: true,
      });
    }
  };

  return (
    <Routes>
      <Route
        path="/inventory/modify"
        element={
          <ModifyProduct
            product={selectedProduct}
            lang={lang}
            theme={theme}
            allProducts={allProducts}
          />
        }
      />
      <Route
        path="/inventory/add"
        element={
          <AddProduct lang={lang} theme={theme} allProducts={allProducts} />
        }
      />

      <Route
        path="/"
        element={
          <>
            <div
              style={{ opacity: popUp.active ? 0.5 : 1 }}
              dir={lang === "ar" ? "rtl" : "ltr"}
              className={`inventory_container ${theme}`}
            >
              <div className={`inventory_controls ${theme}`}>
                <div className="inventory_nav">
                  <input
                    value={search}
                    placeholder={Langs[lang].Inventory.search_placeholder}
                    onChange={(e) => setSearch(e.target.value)}
                    className="inventory_search"
                  />

                  <div className={`inventory_nav_icon ${theme}`}>
                    <SiAddthis onClick={addProduct} />
                    {Langs[lang].Inventory.nav_buttons[0]}
                  </div>

                  <div className={`inventory_nav_icon ${theme}`}>
                    <FaClipboardList onClick={allProducts} />
                    {Langs[lang].Inventory.nav_buttons[1]}
                  </div>

                  <div className={`inventory_nav_icon ${theme}`}>
                    <AiTwotoneAlert onClick={alertedProducts} />
                    {Langs[lang].Inventory.nav_buttons[2]}
                  </div>

                  <div className={`inventory_nav_icon ${theme}`}>
                    <TbBookUpload onClick={importExcel} />
                    {Langs[lang].Inventory.nav_buttons[3]}
                  </div>

                  <div className={`inventory_nav_icon ${theme}`}>
                    <BsFillPrinterFill onClick={print} />
                    {Langs[lang].Inventory.nav_buttons[4]}
                  </div>
                </div>

                {suggestions.length > 0 && (
                  <div
                    style={{
                      height: "200px",
                      width: "100%",
                      overflowY: "scroll",
                    }}
                  >
                    {suggestions.map((prod, i) => {
                      let bgColor = "white";

                      if (prod.stock <= prod.alert) {
                        bgColor = "yellow";
                      }
                      return (
                        <div
                          onClick={() => {
                            setProducts((prev) => [prod]);
                            setSuggestions([]);
                            setSelectedProduct(prod);
                          }}
                          className="suggestions"
                          style={{
                            color: "black",
                            backgroundColor: bgColor,
                            borderRight: "1px solid black",
                            borderLeft: "1px solid black",
                          }}
                          key={i}
                        >
                          {prod.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {selectedProduct[0] && (
                <div className="inventory_product_edit_delete">
                  <AiTwotoneDelete
                    style={{ color: "#d64444" }}
                    onClick={deleteProduct}
                  />
                  <AiTwotoneEdit
                    style={{ color: "#e6c81e" }}
                    onClick={editProduct}
                  />
                </div>
              )}

              {loading ? (
                <Spinner />
              ) : (
                <DataTable
                  data={products}
                  columns={columns}
                  className="inventory_product_table"
                  customStyles={customStyles}
                  responsive
                  striped
                  highlightOnHover
                  pointerOnHover
                  dense
                  pagination
                  selectableRows={true}
                  conditionalRowStyles={conditionalRowStyles}
                  onSelectedRowsChange={(rows) => {
                    setSelectedProduct(rows.selectedRows);
                  }}
                />
              )}
            </div>

            {popUp.active && (
              <PopUp setPopUp={setPopUp} theme={theme} popUp={popUp} />
            )}
          </>
        }
      />
    </Routes>
  );
};

export default Inventory;
