import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import PopUp from "./PopUp";
import Langs from "./Languages";

const DeleteUser = ({ lang, theme }) => {
  const [users, setUsers] = useState([]);
  const [popUp, setPopUp] = useState({
    active: false,
    message: "",
    type: "",
    redirect: "",
  });

  const fetchUsers = async () => {
    const res = await window.api.allUsers();

    if (res) {
      setUsers(res.filter((user) => user.username !== "Admin"));
    }
  };

  useEffect(() => {
    fetchUsers();

    gsap.from(document.querySelector(".delete_user_container"), {
      opacity: 0,
      duration: 2,
    });
  }, []);

  const deleteUser = async (e) => {
    e.preventDefault();
    const res = await window.api.deleteUser(e.target.name);
    if (res && res.text === "User deleted successfully!") {
      setPopUp({
        active: true,
        message: Langs[lang].notifications.deleted,
        type: "success",
        redirect: "",
      });
      await fetchUsers();
    }
  };

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="delete_user_container"
      >
        <h1>
          {users && users.length > 0
            ? Langs[lang].Settings.Users.delete_user[0]
            : Langs[lang].Settings.Users.delete_user[2]}
        </h1>
        <ul>
          {users &&
            users.map((user, i) => {
              return (
                <li style={{ margin: "5px" }} key={i}>
                  {user.username}
                  <button
                    className={theme}
                    name={user.username}
                    onClick={(e) => deleteUser(e)}
                  >
                    {Langs[lang].Settings.Users.delete_user[1]}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      {popUp.active ? (
        <PopUp theme={theme} popUp={popUp} setPopUp={setPopUp} />
      ) : null}
    </>
  );
};

export default DeleteUser;
