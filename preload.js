function _0x56ad(_0x2bab27, _0x31bd30) {
  const _0x3c2739 = _0x3c27();
  return (
    (_0x56ad = function (_0x56adbd, _0x4d1848) {
      _0x56adbd = _0x56adbd - 0x87;
      let _0x1996ea = _0x3c2739[_0x56adbd];
      return _0x1996ea;
    }),
    _0x56ad(_0x2bab27, _0x31bd30)
  );
}
const _0x3b7d8f = _0x56ad;
(function (_0x5de169, _0x23d0ad) {
  const _0x1e2582 = _0x56ad,
    _0xd8d123 = _0x5de169();
  while (!![]) {
    try {
      const _0x35ba5b =
        (-parseInt(_0x1e2582(0xaa)) / 0x1) *
          (-parseInt(_0x1e2582(0x8d)) / 0x2) +
        parseInt(_0x1e2582(0xa6)) / 0x3 +
        (-parseInt(_0x1e2582(0x95)) / 0x4) *
          (-parseInt(_0x1e2582(0xa3)) / 0x5) +
        (parseInt(_0x1e2582(0x98)) / 0x6) * (parseInt(_0x1e2582(0xa2)) / 0x7) +
        (-parseInt(_0x1e2582(0x90)) / 0x8) *
          (-parseInt(_0x1e2582(0xa8)) / 0x9) +
        (parseInt(_0x1e2582(0xa7)) / 0xa) * (parseInt(_0x1e2582(0x94)) / 0xb) +
        -parseInt(_0x1e2582(0x9a)) / 0xc;
      if (_0x35ba5b === _0x23d0ad) break;
      else _0xd8d123["push"](_0xd8d123["shift"]());
    } catch (_0x577c00) {
      _0xd8d123["push"](_0xd8d123["shift"]());
    }
  }
})(_0x3c27, 0xccf37);
const { ipcRenderer, contextBridge } = require("electron"),
  LOGIN_API = {
    login: (_0x31fe1f) => ipcRenderer["invoke"]("login", _0x31fe1f),
  },
  COMMAND_API = {
    command: (_0x3b918a) =>
      ipcRenderer[_0x3b7d8f(0x8e)](_0x3b7d8f(0x9f), _0x3b918a),
  },
  SELL_API = {
    filterProduct: (_0x1f7c55) =>
      ipcRenderer["invoke"](_0x3b7d8f(0x9c), _0x1f7c55),
    allProducts: () => ipcRenderer[_0x3b7d8f(0xa0)]("all_products"),
    deleteProduct: (_0x1170e6) =>
      ipcRenderer["invoke"]("delete_product", _0x1170e6),
    updateProduct: (_0x5f23c4) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0xa5), _0x5f23c4),
    addProduct: (_0x4c7742) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x96), _0x4c7742),
    allClients: () => ipcRenderer["invoke"](_0x3b7d8f(0x9b)),
    addClient: (_0x3d94aa) => ipcRenderer["invoke"](_0x3b7d8f(0x88), _0x3d94aa),
    editClient: (_0x364d63) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x9e), _0x364d63),
    deleteClient: (_0x2acdb0) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x8f), _0x2acdb0),
    filterClient: (_0x6fccea) =>
      ipcRenderer[_0x3b7d8f(0xa0)]("filter_client", _0x6fccea),
    removeDebt: (_0xb4a445) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x97), _0xb4a445),
    validateDeal: (_0x3a1abc) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0xa9), _0x3a1abc),
    saveTransactionDetails: (_0x20ffd9) =>
      ipcRenderer[_0x3b7d8f(0xa0)]("save_transaction_details", _0x20ffd9),
    allTransactions: () => ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x8c)),
    processTransaction: (_0x201a11) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x91), _0x201a11),
    getTransactionsNumber: () =>
      ipcRenderer[_0x3b7d8f(0xa0)]("get_transaction_number"),
    deleteTransaction: (_0x5ec652) =>
      ipcRenderer["invoke"](_0x3b7d8f(0xab), _0x5ec652),
    allUsers: () => ipcRenderer[_0x3b7d8f(0xa0)]("all_users"),
    updateUser: (_0x5235b8) =>
      ipcRenderer["invoke"](_0x3b7d8f(0xa4), _0x5235b8),
    createUser: (_0x182a51) =>
      ipcRenderer[_0x3b7d8f(0xa0)]("create_user", _0x182a51),
    deleteUser: (_0x4fa5f6) =>
      ipcRenderer[_0x3b7d8f(0xa0)]("delete_user", _0x4fa5f6),
    updateAdminPassword: (_0x297d9a) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x87), _0x297d9a),
    updatePrivilege: (_0x24d106) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x9d), _0x24d106),
    checkPrivilege: (_0x86e75a) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x92), _0x86e75a),
    changeLanguage: (_0x5751fe) =>
      ipcRenderer["invoke"]("change_language", _0x5751fe),
    getLanguage: () => ipcRenderer["invoke"](_0x3b7d8f(0x99)),
    changeTheme: (_0x473e96) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x93), _0x473e96),
    getTheme: () => ipcRenderer["invoke"]("get_theme"),
    checkInternet: () => ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0x89)),
    sendMessage: (_0x5b2859) =>
      ipcRenderer[_0x3b7d8f(0xa0)]("send_message", _0x5b2859),
    printProductsPDF: (_0x152151) =>
      ipcRenderer[_0x3b7d8f(0xa0)](_0x3b7d8f(0xa1), _0x152151),
  },
  editProduct = (_0x43d3ce) => {
    const _0x4dd78a = _0x3b7d8f;
    ipcRenderer["invoke"](_0x4dd78a(0x8a), _0x43d3ce);
  };
contextBridge[_0x3b7d8f(0x8b)]("api", {
  ...LOGIN_API,
  ...COMMAND_API,
  ...SELL_API,
  editProduct: editProduct,
});
function _0x3c27() {
  const _0x549a03 = [
    "command",
    "invoke",
    "print_inventory",
    "10178kkLeyC",
    "10QWtEeS",
    "update_user",
    "update_product",
    "4893837RXITXS",
    "40wYaLnK",
    "18nwMKzB",
    "validate_deal",
    "1WJopXa",
    "delete_transaction",
    "update_admin_password",
    "add_client",
    "check_internet",
    "edit_product",
    "exposeInMainWorld",
    "all_transactions",
    "2914004ChvDLr",
    "send",
    "delete_client",
    "5225528uUFhXA",
    "process_transaction",
    "check_privilege",
    "change_theme",
    "3111559EQWeur",
    "2356804WpGdIJ",
    "add_product",
    "remove_debt",
    "3252GBJYoE",
    "get_language",
    "79837560qYJsZW",
    "all_clients",
    "filter_product",
    "update_privilege",
    "edit_client",
  ];
  _0x3c27 = function () {
    return _0x549a03;
  };
  return _0x3c27();
}
