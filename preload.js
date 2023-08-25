const { ipcRenderer, contextBridge } = require("electron");

// LOGIN
const LOGIN_API = {
  login: (fields) => ipcRenderer.invoke("login", fields),
};

// CMD
const COMMAND_API = {
  command: (cmd) => ipcRenderer.send("command", cmd),
};

// SELL MODE
const SELL_API = {
  //Products
  filterProduct: (searchTerm) =>
    ipcRenderer.invoke("filter_product", searchTerm),
  allProducts: () => ipcRenderer.invoke("all_products"),
  deleteProduct: (products) => ipcRenderer.invoke("delete_product", products),
  updateProduct: (product) => ipcRenderer.invoke("update_product", product),
  addProduct: (product) => ipcRenderer.invoke("add_product", product),

  // Clients
  allClients: () => ipcRenderer.invoke("all_clients"),
  addClient: (client) => ipcRenderer.invoke("add_client", client),
  editClient: (client) => ipcRenderer.invoke("edit_client", client),
  deleteClient: (client) => ipcRenderer.invoke("delete_client", client),
  filterClient: (searchTerm) => ipcRenderer.invoke("filter_client", searchTerm),
  removeDebt: (payload) => ipcRenderer.invoke("remove_debt", payload),

  // Transactions
  validateDeal: (products) => ipcRenderer.invoke("validate_deal", products),
  saveTransactionDetails: (args) =>
    ipcRenderer.invoke("save_transaction_details", args),
  allTransactions: () => ipcRenderer.invoke("all_transactions"),
  processTransaction: (args) => ipcRenderer.invoke("process_transaction", args),
  getTransactionsNumber: () => ipcRenderer.invoke("get_transaction_number"),
  deleteTransaction: (transactions) =>
    ipcRenderer.invoke("delete_transaction", transactions),

  // Users
  allUsers: () => ipcRenderer.invoke("all_users"),
  updateUser: (user) => ipcRenderer.invoke("update_user", user),
  createUser: (user) => ipcRenderer.invoke("create_user", user),
  deleteUser: (username) => ipcRenderer.invoke("delete_user", username),
  updateAdminPassword: (password) =>
    ipcRenderer.invoke("update_admin_password", password),
  updatePrivilege: (payload) => ipcRenderer.invoke("update_privilege", payload),
  checkPrivilege: (payload) => ipcRenderer.invoke("check_privilege", payload),

  // Other

  changeLanguage: (language) => ipcRenderer.invoke("change_language", language),
  getLanguage: () => ipcRenderer.invoke("get_language"),
  changeTheme: (theme) => ipcRenderer.invoke("change_theme", theme),
  getTheme: () => ipcRenderer.invoke("get_theme"),
  checkInternet: () => ipcRenderer.invoke("check_internet"),
  sendMessage: (payload) => ipcRenderer.invoke("send_message", payload),
  printProductsPDF: (products) =>
    ipcRenderer.invoke("print_inventory", products),
};

/*

const printProductsPDF = (canvas) =>{
    const imgData = canvas.toDataURL("image/jpeg", 1.0)
    
    const pdf = new jsPDF('p','mm','a4')

    pdf.addImage(imgData, 'JPEG', 0, 0)
    pdf.save("../download.pdf")
}


const printPage = (page) =>{
    ipcRenderer.send('print_page', page)
}

*/

const editProduct = (product) => {
  ipcRenderer.invoke("edit_product", product);
};

contextBridge.exposeInMainWorld("api", {
  ...LOGIN_API,
  ...COMMAND_API,
  ...SELL_API,
  editProduct,
});
