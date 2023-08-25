import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import PopUp from "./PopUp";
import Langs from "./Languages";

const ModifyUser = ({ lang, theme }) => {
  const [users, setUsers] = useState([]);
  const [modifySwitch, setModifySwitch] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const [popUp, setPopUp] = useState({
    active: false,
    type: "",
    redirect: "",
    message: "",
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

  const save = async (e) => {
    e.preventDefault();

    if (fields.username.length > 0 && fields.password.length > 0) {
      const res = await window.api.updateUser({
        oldUser_username: selectedUser.username,
        newUser: fields,
      });

      if (res.text) {
        setPopUp({
          active: true,
          message: Langs[lang].notifications.updated,
          type: "success",
          redirect: "",
        });

        await fetchUsers();
        setModifySwitch(false);
        setFields({
          username: "",
          password: "",
        });
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

  const modifyUser = (e, user) => {
    setSelectedUser(user);
    setModifySwitch(true);
  };

  return (
    <>
      <div
        style={{ opacity: popUp.active ? 0.5 : 1 }}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="delete_user_container"
      >
        {modifySwitch ? (
          <div className="modify_user_container">
            <input
              type="text"
              placeholder={Langs[lang].Settings.Users.modify_user[4]}
              value={fields.username}
              onChange={(e) =>
                setFields({ ...fields, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder={Langs[lang].Settings.Users.modify_user[5]}
              value={fields.password}
              onChange={(e) =>
                setFields({ ...fields, password: e.target.value })
              }
            />
            <button className={theme} onClick={save}>
              {Langs[lang].Settings.Users.modify_user[3]}
            </button>
          </div>
        ) : (
          <>
            <h1>
              {users && users.length > 0
                ? Langs[lang].Settings.Users.modify_user[0]
                : Langs[lang].Settings.Users.modify_user[2]}
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
                        onClick={(e) => modifyUser(e, user)}
                      >
                        {Langs[lang].Settings.Users.modify_user[1]}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </div>

      {popUp.active ? (
        <PopUp theme={theme} popUp={popUp} setPopUp={setPopUp} />
      ) : null}
    </>
  );
};

export default ModifyUser;
