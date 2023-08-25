import React, { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import { gsap } from "gsap";
import { Ctx } from "../context/Ctx";
import { AiTwotoneDelete } from "react-icons/ai";
import Spinner from "./Spinner";
import Langs from "./Languages";
import PopUp from "./PopUp";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [uniqueDates, setUniqueDates] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberOfTransactions, setNumberOfTransactions] = useState(0);
  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    type: "",
    redirect: "",
  });

  const { theme, lang } = useContext(Ctx);

  const columns = [
    {
      name: Langs[lang].Transactions.transactions_table_columns[0],
      selector: (row) => Number(row.deal_number).toFixed(0),
    },
    {
      name: Langs[lang].Transactions.transactions_table_columns[1],
      selector: (row) => row.date,
    },
    {
      name: Langs[lang].Transactions.transactions_table_columns[2],
      selector: (row) => row.time,
    },
    {
      name: Langs[lang].Transactions.transactions_table_columns[3],
      selector: (row) => row.total,
    },
    {
      name: Langs[lang].Transactions.transactions_table_columns[4],
      selector: (row) => row.user,
    },
  ];

  const deleteTransaction = async () => {
    setLoading(true);

    if (selectedTransaction.length === numberOfTransactions) {
      const res = await window.api.deleteTransaction({
        DELETE_ALL: true,
      });

      if (res.text) {
        await fetchAllTransactions();

        setPopUp({
          type: "success",
          message: Langs[lang].notifications.deleted,
          redirect: "",
          active: true,
        });
      }
    } else {
      const res = await window.api.deleteTransaction({
        DELETE_ALL: false,
        transactions: selectedTransaction,
      });
      if (res.text) {
        await fetchAllTransactions();

        setPopUp({
          type: "success",
          message: Langs[lang].notifications.deleted,
          redirect: "",
          active: true,
        });
      }
    }

    setLoading(false);
  };

  const updateFromDate = async (date, selected_user = selectedUser) => {
    setFromDate(date);
    setSelectedTransaction([]);

    const res = await window.api.allTransactions();

    const startDateObj = new Date(date);
    let endDateObj = new Date(uniqueDates[uniqueDates.length - 1]);

    if (toDate.length > 0) {
      endDateObj = new Date(toDate);
    }

    const filteredTransactions = res.reverse().filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      if (selected_user.length > 0) {
        return (
          transactionDate >= startDateObj &&
          transactionDate <= endDateObj &&
          transaction.user === selected_user
        );
      } else {
        return transactionDate >= startDateObj && transactionDate <= endDateObj;
      }
    });

    setTransactions(filteredTransactions);
  };

  const updateToDate = async (date) => {
    setToDate(date);
    setSelectedTransaction([]);

    const res = await window.api.allTransactions();
    const endDateObj = new Date(date);
    let startDateObj = new Date(uniqueDates[0]);

    const filteredTransactions = res.reverse().filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (fromDate.length > 0) {
        startDateObj = new Date(fromDate);
      }

      if (selectedUser.length > 0) {
        return (
          transactionDate >= startDateObj &&
          transactionDate <= endDateObj &&
          transaction.user === selectedUser
        );
      } else {
        return transactionDate >= startDateObj && transactionDate <= endDateObj;
      }
    });

    setTransactions(filteredTransactions);
  };

  const updateSelectedUser = async (e) => {
    setSelectedUser(e.target.value);

    setSelectedTransaction([]);

    if (e.target.value.length > 0) {
      if (fromDate.length > 0) {
        await updateFromDate(fromDate, e.target.value);
      } else {
        const res = await window.api.allTransactions();

        const filteredTransactions = res.filter(
          (transaction) => transaction.user === e.target.value
        );

        setTransactions(filteredTransactions);
      }
    } else {
      await fetchAllTransactions();
      setFromDate("");
      setToDate("");
    }
  };

  const fetchAllTransactions = async () => {
    const res = await window.api.allTransactions();

    setSelectedTransaction([]);

    if (res && res.length > 0) {
      // Array that stores none replicated dates
      setUniqueDates([...new Set(res.map((transaction) => transaction.date))]);

      // Array that stores none replicated users
      setUniqueUsers([...new Set(res.map((transaction) => transaction.user))]);

      setTransactions(res);
      setNumberOfTransactions(res.length);
    } else {
      setPopUp({
        type: "info",
        message: Langs[lang].notifications.db_empty,
        redirect: "",
        active: true,
      });

      setTransactions([]);
      setNumberOfTransactions(0);
    }
  };

  const calculateTotalAndProfit = (trans = []) => {
    let tot = 0;
    let profit = 0;

    trans.forEach((tran) => {
      tot += tran.total;
      profit += tran.profit;
    });

    return {
      tot,
      profit,
    };
  };

  useEffect(() => {
    fetchAllTransactions();

    if (firstLoad) {
      gsap.from(document.querySelector(".transactions_container"), {
        opacity: 0,
        duration: 1.2,
      });

      setFirstLoad(false);
    }
  }, []);

  const ExpandedComponent = ({ data }) => {
    const productsList = JSON.parse(data.products_list);

    return (
      <div
        className={theme}
        style={{
          padding: "10px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          margin: "15px auto",
        }}
      >
        {productsList.map((prod, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                width: "100%",
              }}
            >
              <pre
                style={{
                  width: "60%",
                  textAlign: "left",
                  fontFamily: "DS DIGITAL",
                }}
              >
                {prod.name}
              </pre>
              <pre
                style={{
                  width: "10%",
                  textAlign: "left",
                  fontFamily: "DS DIGITAL",
                }}
              >
                {prod.quantity}
              </pre>
              <pre
                style={{
                  width: "10%",
                  textAlign: "left",
                  fontFamily: "DS DIGITAL",
                }}
              >
                {prod.price} DZD
              </pre>
            </div>
          );
        })}

        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
            borderTop: "1px solid white",
            marginTop: "10px",
          }}
        >
          <label style={{ fontFamily: "DS DIGITAL", fontWeight: "normal" }}>
            {Langs[lang].Transactions.nav_fields[4]} :{" "}
          </label>{" "}
          <span style={{ fontFamily: "DS DIGITAL", fontWeight: "normal" }}>
            {data.total} DZD
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`transactions_container ${theme}`}
      >
        <div className={`transactions_controls ${theme}`}>
          <div className="transactions_control_group">
            <label>{Langs[lang].Transactions.nav_fields[0]} :</label>

            <select
              value={fromDate}
              onChange={(e) => updateFromDate(e.target.value)}
            >
              <option value="">{Langs[lang].Transactions.nav_fields[1]}</option>

              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          <div className="transactions_control_group">
            <label>{Langs[lang].Transactions.nav_fields[2]} :</label>

            <select
              value={toDate}
              onChange={(e) => updateToDate(e.target.value)}
            >
              <option value="">{Langs[lang].Transactions.nav_fields[1]}</option>

              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          <div className="transactions_control_group">
            <label>{Langs[lang].Transactions.nav_fields[3]} :</label>

            <select
              value={selectedUser}
              onChange={(e) => {
                updateSelectedUser(e);
              }}
            >
              <option value="">{Langs[lang].Transactions.nav_fields[1]}</option>

              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={`transactions_metrics ${theme}`}>
          <div>
            {Langs[lang].Transactions.nav_fields[4]} :{" "}
            {calculateTotalAndProfit(transactions).tot}
          </div>

          <div>
            {Langs[lang].Transactions.nav_fields[5]} :{" "}
            {calculateTotalAndProfit(transactions).profit}
          </div>
        </div>

        {selectedTransaction[0] && (
          <div className="inventory_product_edit_delete">
            <AiTwotoneDelete
              style={{ color: "#d64444" }}
              onClick={deleteTransaction}
            />
          </div>
        )}

        {loading ? (
          <Spinner theme={theme} />
        ) : (
          <DataTable
            direction="ltr"
            data={transactions}
            columns={columns}
            className="inventory_product_table"
            responsive
            striped
            highlightOnHover
            pointerOnHover
            selectableRows={true}
            onSelectedRowsChange={(rows) => {
              setSelectedTransaction(rows.selectedRows);
            }}
            dense
            pagination
            expandableRows
            expandableRowsComponent={ExpandedComponent}
          />
        )}
      </div>

      {popUp.active ? (
        <PopUp theme={theme} setPopUp={setPopUp} popUp={popUp} />
      ) : null}
    </>
  );
};

export default Transactions;
