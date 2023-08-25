import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import Langs from "./Languages";

const Priveleges = ({ lang }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await window.api.allUsers();

    if (res) {
      setUsers(res.filter((user) => user.username !== "Admin"));
    }
  };

  useEffect(() => {
    fetchUsers();

    gsap.from(document.querySelector(".settings_priveleges"), {
      opacity: 0,
      duration: 2,
    });
  }, []);

  const updatePrivilege = async (privilege, value) => {
    const updatedUsers = users.map((user) => {
      if (user.username === selectedUser) {
        return { ...user, [privilege]: value ? 1 : 0 };
      }
      return user;
    });

    setUsers(updatedUsers);

    await window.api.updatePrivilege({
      privilege,
      value: value ? "on" : "off",
      user: selectedUser,
    });
  };

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="settings_priveleges">
      <div className="settings_privileges_head">
        <h1>{Langs[lang].Settings.Privileges.fields[0]} :</h1>

        <select
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
          }}
        >
          <option value="">{Langs[lang].Settings.Privileges.fields[1]}</option>

          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {selectedUser.length > 0 && (
        <ul className="settings_privileges_body">
          <li>
            <label>{Langs[lang].Settings.Privileges.sell} : </label>
            <input
              name="SELL"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser).SELL === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.access_inventory} : </label>
            <input
              name="ACCESS_INVENTORY"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .ACCESS_INVENTORY === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.add_products} : </label>
            <input
              name="ADD_PRODUCTS"
              type="checkbox"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .ADD_PRODUCTS === 1
              }
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.delete_products} : </label>
            <input
              name="DELETE_PRODUCTS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .DELETE_PRODUCTS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.grant_privileges} : </label>
            <input
              name="GRANT_PRIVILEGES"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .GRANT_PRIVILEGES === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.modify_products} : </label>

            <input
              name="MODIFY_PRODUCTS"
              type="checkbox"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .MODIFY_PRODUCTS === 1
              }
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.import_products} : </label>
            <input
              name="IMPORT_PRODUCTS"
              type="checkbox"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .IMPORT_PRODUCTS === 1
              }
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.print_inventory} : </label>
            <input
              name="PRINT_INVENTORY"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .PRINT_INVENTORY === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.access_clients} : </label>
            <input
              name="ACCESS_CLIENTS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .ACCESS_CLIENTS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.add_clients} : </label>
            <input
              name="ADD_CLIENTS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .ADD_CLIENTS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.delete_clients} : </label>
            <input
              name="DELETE_CLIENTS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .DELETE_CLIENTS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.modify_clients} : </label>
            <input
              name="MODIFY_CLIENTS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .MODIFY_CLIENTS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.modify_clients} : </label>
            <input
              name="CREDIT_CLIENTS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .CREDIT_CLIENTS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>
              {Langs[lang].Settings.Privileges.print_clients_list} :{" "}
            </label>
            <input
              name="PRINT_CLIENTS_LIST"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .PRINT_CLIENTS_LIST === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.access_settings} : </label>
            <input
              name="ACCESS_SETTINGS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .ACCESS_SETTINGS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.add_users} : </label>
            <input
              name="ADD_USERS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .ADD_USERS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.delete_users} : </label>
            <input
              name="DELETE_USERS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .DELETE_USERS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>{Langs[lang].Settings.Privileges.modify_users} : </label>
            <input
              name="MODIFY_USERS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .MODIFY_USERS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>
              {Langs[lang].Settings.Privileges.access_parameters} :{" "}
            </label>
            <input
              name="ACCESS_PARAMETERS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .ACCESS_PARAMETERS === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>
              {Langs[lang].Settings.Privileges.change_admin_password} :{" "}
            </label>
            <input
              name="CHANGE_ADMIN_PASSWORD"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .CHANGE_ADMIN_PASSWORD === 1
              }
              type="checkbox"
            />
          </li>

          <li>
            <label>
              {Langs[lang].Settings.Privileges.access_transactions} :{" "}
            </label>
            <input
              name="ACCESS_TRANSACTIONS"
              onChange={(e) => updatePrivilege(e.target.name, e.target.checked)}
              checked={
                users.find((user) => user.username === selectedUser)
                  .ACCESS_TRANSACTIONS === 1
              }
              type="checkbox"
            />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Priveleges;
