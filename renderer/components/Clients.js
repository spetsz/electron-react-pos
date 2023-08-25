import React, { useState, useContext, useEffect } from "react";
import { Ctx } from "../context/Ctx";
import DataTable from "react-data-table-component";
import { useNavigate, Routes, Route } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { TiUserAdd, TiDelete } from "react-icons/ti";
import AddClient from "./AddClient";
import ModifyClient from "./ModifyClient";
import Spinner from "./Spinner";
import { gsap } from "gsap";
import Langs from "./Languages";
import PopUp from "./PopUp";

const initState = {
  name: "",
  phone: "",
  debt: "",
  transactions_all_time: "",
  transactions_last_month: "",
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

const Clients = () => {
  const router = useNavigate();
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(initState);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    type: "",
    redirect: "",
  });

  const { USER, theme, lang } = useContext(Ctx);

  const columns = [
    {
      name: Langs[lang].Clients.clients_table_columns[0],
      selector: (row) => row.name,
    },
    {
      name: Langs[lang].Clients.clients_table_columns[1],
      selector: (row) => row.phone,
    },
    {
      name: Langs[lang].Clients.clients_table_columns[2],
      selector: (row) => row.debt,
    },
  ];

  useEffect(() => {
    allClients();

    const filterClient = async () => {
      const res = await window.api.filterClient(search);

      if (res && res.length > 0) {
        setSuggestions(res);

        if (search === res[0].name) {
          setClients(res);

          setSearch("");
          setSuggestions([]);
        }
      }
    };

    if (search.length > 0) {
      filterClient();
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

  const allClients = async () => {
    setSelectedClient(initState);
    const res = await window.api.allClients();
    if (res && res.length > 0) {
      setClients(res);
    } else {
      setClients([]);

      setPopUp({
        active: true,
        type: "info",
        message: Langs[lang].notifications.db_empty,
        redirect: "",
      });
    }
  };

  const addClient = async () => {
    const res = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "ADD_CLIENTS",
    });

    if (res.granted) {
      router("clients/add");
    } else {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.access_denied,
        type: "info",
        redirect: "",
      });
    }
  };

  const deleteClient = async () => {
    const res = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "DELETE_CLIENTS",
    });

    if (res.granted) {
      if (clients.length === selectedClient.length) {
        setLoading(true);
        const res = await window.api.deleteClient("ALL");
        allClients();
        setLoading(false);
        setPopUp({
          active: true,
          message: Langs[lang].notifications.deleted,
          type: "success",
          redirect: "",
        });
      } else {
        setLoading(true);
        const res = await window.api.deleteClient(selectedClient);
        allClients();
        setLoading(false);
        setPopUp({
          active: true,
          message: Langs[lang].notifications.deleted,
          type: "success",
          redirect: "",
        });
      }
    } else {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.access_denied,
        type: "info",
        redirect: "",
      });
    }
  };

  const editClient = async () => {
    const res = await window.api.checkPrivilege({
      username: USER.username,
      privilege: "MODIFY_CLIENTS",
    });

    if (res.granted) {
      router("clients/modify");
    } else {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.access_denied,
        type: "info",
        redirect: "",
      });
    }
  };

  /*
  const print = async () => {

    const res = await window.api.checkPrivilege({username : USER.username, privilege : 'PRINT_CLIENTS_LIST'})

    if(res.granted){

      if(clients.length > 0){
        const table = document.querySelector('.inventory_product_table')
        const canvas = await html2canvas(table)
        window.api.printProductsPDF(canvas)
      }else{
        window.alert('Nothing to print!')
      }

    }else{
      window.alert('Access denied')
    }


    
  }

  */

  const ExpandedComponent = ({ data }) => {
    let prods = "";

    if (data.products.length > 0) {
      prods = JSON.parse(data.products);
    }

    const handleButtonClick = async (prod) => {
      const payload = {
        client: data.name,
        products: prods.filter((product) => product !== prod),
      };

      const res = await window.api.removeDebt(payload);

      if (res && res.text) {
        setPopUp({
          active: true,
          message: Langs[lang].notifications.debted_product_removed,
          type: "success",
          redirect: "",
        });

        await allClients();
      }

      /* I need to make a function that deletes debted prods
      
      const clientFields = {
        name : selectedClient.name,
        phone : selectedClient.phone, 
        debt : selectedClient.debt + total, 
        transactions_all_time : selectedClient.transactions_all_time + total, 
        transactions_last_month : selectedClient.transactions_last_month + total,
        products : productList
      }

      const res = await window.api.editClient({

      })

      */
    };

    const columns = [
      {
        name: "Product",
        selector: (row) => row.name,
      },
      {
        name: "Quantity",
        selector: (row) => row.quantity,
      },
      {
        name: "Price",
        selector: (row) => row.price,
      },
      {
        cell: (row) => (
          <TiDelete
            className="client_product_table_button"
            onClick={() => handleButtonClick(row)}
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];

    /*
        
    const productsList = JSON.parse(data.products)

    let total = 0

    productsList.forEach(prod =>{
      total += prod.price * prod.quantity
    })




    
    return(

       

        <div className={theme} style={{padding : '10px', borderRadius : '5px' ,display: 'flex', flexDirection : 'column', alignItems : 'center', width : '50%', margin : '15px auto'}}>
            {
                productsList.map( (prod,i) => {

                    return(

                    <div  key={i} style={{display : 'flex', justifyContent : 'space-between', alignContent : 'center', width : '100%'}}>
                        
                        <pre style={{width : '60%', textAlign : 'left', fontFamily: 'DS DIGITAL'}}>{prod.name}</pre>
                        <pre style={{width : '10%', textAlign : 'left', fontFamily: 'DS DIGITAL'}}>{prod.quantity}</pre>
                        <pre style={{width : '10%', textAlign : 'left', fontFamily: 'DS DIGITAL'}}>{prod.price} DZD</pre>
    
                    </div>

                    )
                })
            }

            <div style={{fontWeight: 'bold',display : 'flex', justifyContent: 'space-between', alignContent : 'center', width : '100%', borderTop : '1px solid white', marginTop : '10px'}}>
                <label style={{fontFamily: 'DS DIGITAL', fontWeight : "normal" }}>{Langs[lang].Transactions.nav_fields[4]} : </label> <span style={{fontFamily: 'DS DIGITAL', fontWeight : "normal" }}>{total} DZD</span> 
            </div>
        </div>
    )

    
    
*/

    return (
      <div className="client_product_table">
        <DataTable
          data={prods}
          columns={columns}
          className="table"
          responsive
          highlightOnHover
          pointerOnHover
          dense

          /*
                    onSelectedRowsChange = {
                      (rows)=>{
                        setSelectedClient(rows.selectedRows)
                      }
                    } 

                    */
        />
      </div>
    );
  };

  return (
    <Routes>
      <Route
        path="/clients/modify"
        element={
          <ModifyClient
            theme={theme}
            client={selectedClient}
            lang={lang}
            allClients={allClients}
          />
        }
      />
      <Route
        path="/clients/add"
        element={
          <AddClient theme={theme} lang={lang} allClients={allClients} />
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
                    placeholder={Langs[lang].Clients.search_placeholder}
                    onChange={(e) => setSearch(e.target.value)}
                    className="inventory_search"
                  />

                  <div className={`inventory_nav_icon ${theme}`}>
                    <TiUserAdd onClick={addClient} />
                    {Langs[lang].Clients.nav_buttons[0]}
                  </div>

                  <div className={`inventory_nav_icon ${theme}`}>
                    <FaClipboardList onClick={allClients} />
                    {Langs[lang].Clients.nav_buttons[1]}
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
                    {suggestions.map((client, i) => {
                      let bgColor = "white";
                      return (
                        <div
                          onClick={() => {
                            setClients([client]);
                            setSearch("");
                            setSuggestions([]);
                            setSelectedClient(client);
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
                          {client.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {selectedClient[0] && (
                <div className="inventory_product_edit_delete">
                  <AiTwotoneDelete
                    style={{ color: "#d64444" }}
                    onClick={deleteClient}
                  />
                  <AiTwotoneEdit
                    style={{ color: "#e6c81e" }}
                    onClick={editClient}
                  />
                </div>
              )}

              {loading ? (
                <Spinner />
              ) : (
                <DataTable
                  direction="ltr"
                  data={clients}
                  columns={columns}
                  className="inventory_product_table"
                  customStyles={customStyles}
                  responsive
                  striped
                  highlightOnHover
                  pointerOnHover
                  dense
                  pagination
                  expandableRows
                  expandableRowsComponent={ExpandedComponent}
                  selectableRows={true}
                  onSelectedRowsChange={(rows) => {
                    setSelectedClient(rows.selectedRows);
                  }}
                />
              )}
            </div>

            {popUp.active ? (
              <PopUp setPopUp={setPopUp} theme={theme} popUp={popUp} />
            ) : null}
          </>
        }
      />
    </Routes>
  );
};

export default Clients;
