const _0x3df742 = _0x4714;
(function (_0x46aeb9, _0x7a1387) {
  const _0x4c5fa6 = _0x4714,
    _0x45e9fe = _0x46aeb9();
  while (!![]) {
    try {
      const _0x4b712b =
        (-parseInt(_0x4c5fa6(0x9a)) / 0x1) *
          (parseInt(_0x4c5fa6(0x131)) / 0x2) +
        parseInt(_0x4c5fa6(0x105)) / 0x3 +
        parseInt(_0x4c5fa6(0xdd)) / 0x4 +
        parseInt(_0x4c5fa6(0x133)) / 0x5 +
        -parseInt(_0x4c5fa6(0xcc)) / 0x6 +
        (-parseInt(_0x4c5fa6(0x10f)) / 0x7) *
          (-parseInt(_0x4c5fa6(0xf5)) / 0x8) +
        (-parseInt(_0x4c5fa6(0xb7)) / 0x9) * (parseInt(_0x4c5fa6(0x119)) / 0xa);
      if (_0x4b712b === _0x7a1387) break;
      else _0x45e9fe["push"](_0x45e9fe["shift"]());
    } catch (_0x2c2a77) {
      _0x45e9fe["push"](_0x45e9fe["shift"]());
    }
  }
})(_0x50d2, 0xbc9bf);
const { app, BrowserWindow, ipcMain, screen } = require("electron"),
  path = require(_0x3df742(0xd9)),
  fs = require("fs"),
  mongoose = require("mongoose"),
  Database = require("better-sqlite3"),
  { PDFDocument, rgb } = require(_0x3df742(0x91)),
  checkInternetConnected = require(_0x3df742(0x124)),
  Store = require(_0x3df742(0x96)),
  store = new Store(),
  os = require("os"),
  userDataPath = app[_0x3df742(0xd0)](_0x3df742(0xf0)),
  databasePath = path[_0x3df742(0x11f)](userDataPath, _0x3df742(0xa4));
!fs[_0x3df742(0xf8)](userDataPath) &&
  fs[_0x3df742(0x8e)](userDataPath, { recursive: !![] });
const db = new Database(databasePath);
let internetConnection = ![];
function _0x50d2() {
  const _0x2b5ce7 = [
    "set",
    "apple.com",
    "getMinutes",
    "send_message",
    "all",
    "quit",
    "CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20clients\x20(name\x20TEXT\x20UNIQUE,\x20phone\x20TEXT\x20UNIQUE,\x20debt\x20INTEGER\x20DEFAULT\x200,\x20transactions_all_time\x20INTEGER\x20DEFAULT\x200,\x20transactions_last_month\x20INTEGER\x20DEFAULT\x200,\x20products\x20TEXT)",
    "toString",
    "push",
    "Failed\x20to\x20delete\x20client\x20",
    "Failed\x20to\x20add\x20clients\x20to\x20the\x20database.",
    "Client\x20cannot\x20be\x20added",
    "getMonth",
    "not\x20saved",
    "save_transaction_details",
    "mkdirSync",
    "length",
    "Prix",
    "pdf-lib",
    "Something\x20went\x20wrong!",
    "INSERT\x20INTO\x20products\x20(name,\x20barcode,\x20stock,\x20price,\x20profit,\x20alert,\x20image)\x20VALUES\x20(?,\x20?,\x20?,\x20?,\x20?,\x20?,\x20?)",
    "Error\x20deleting\x20products",
    "\x20clients\x20have\x20been\x20deleted!",
    "electron-store",
    "All\x20clients\x20deleted!",
    "delete_user",
    "./models/Transactions",
    "1RkcSyI",
    "all_clients",
    "\x20updated!",
    "check_privilege",
    "deal_number",
    "UPDATE\x20users\x20SET\x20password\x20=\x20?\x20WHERE\x20\x20username\x20=\x20\x27Admin\x27",
    "stringify",
    "\x20transaction\x20have\x20been\x20deleted",
    "Nom",
    "width",
    "my_database.db",
    "Client\x20",
    "You\x20are\x20trying\x20to\x20add\x20a\x20dupliacte\x20product,\x20make\x20sure\x20the\x20name\x20and\x20barcode\x20are\x20unique",
    "getSize",
    "login",
    "create_user",
    "Client\x20doesn\x27t\x20exist\x20in\x20DB!",
    "\x20FROM\x20users\x20WHERE\x20username\x20=\x20?",
    "/preload.js",
    "validate_deal",
    "Validated",
    "barcode",
    "workAreaSize",
    "\x20is\x20duplicated",
    "SELECT\x20*\x20FROM\x20users\x20WHERE\x20username\x20=\x20?\x20AND\x20password\x20=\x20?",
    "file://",
    "delete_client",
    "UPDATE\x20clients\x20SET\x20products\x20=\x20?,\x20debt\x20=\x20?\x20WHERE\x20name\x20=\x20?",
    "ALL",
    "1814535jnELDj",
    "UPDATE\x20users\x20SET\x20password\x20=\x20?,\x20username\x20=\x20?\x20WHERE\x20\x20username\x20=\x20\x27",
    "Failed\x20to\x20delete\x20clients!",
    "CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20products\x20(name\x20TEXT\x20NOT\x20NULL\x20UNIQUE,\x20barcode\x20NUMBER\x20NOT\x20NULL\x20UNIQUE,\x20stock\x20INTEGER\x20NOT\x20NULL,\x20alert\x20INTEGER\x20NOT\x20NULL,\x20price\x20INTEGER\x20NOT\x20NULL,\x20image\x20BLOB,\x20profit\x20NUMBER\x20DEFAULT\x200)",
    "print_inventory",
    "Invalid\x20arguments!",
    "process_transaction",
    "Failed\x20to\x20update\x20user!",
    "create",
    "saved",
    "getHeight",
    "all_users",
    "UPDATE\x20products\x20SET\x20stock\x20=\x20?\x20WHERE\x20barcode\x20=\x20?",
    "DELETE\x20FROM\x20clients\x20WHERE\x20name\x20=\x20$name",
    "all_products",
    "No\x20connection",
    "then",
    "SELECT\x20*\x20FROM\x20users",
    "get_language",
    "Stock.pdf",
    "NODE_ENV",
    "3410376spaETr",
    "Failed\x20to\x20update\x20password!",
    "check_internet",
    "Failed\x20to\x20process\x20transaction",
    "getPath",
    "update_privilege",
    "SELECT\x20*\x20FROM\x20transactions",
    "DELETE\x20FROM\x20clients",
    "map",
    "get",
    "isArray",
    "INSERT\x20INTO\x20clients\x20VALUES\x20(?,\x20?,\x20?,\x20?,\x20?,\x20?)",
    "getWidth",
    "path",
    "UPDATE\x20products\x20SET\x20name\x20=\x20?,\x20stock\x20=\x20?,\x20price\x20=\x20?,\x20profit\x20=\x20?,\x20alert\x20=\x20?,\x20image\x20=\x20?\x20WHERE\x20barcode\x20=\x20?",
    "forEach",
    "All\x20transactions\x20deleted",
    "4622188nEasUP",
    "firstRun",
    "type",
    "getPrimaryDisplay",
    "DELETE_ALL",
    "\x20=\x20?\x20WHERE\x20username\x20=\x20?",
    "Product\x20doesn\x27t\x20exist\x20in\x20DB!",
    "CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20transactions\x20(deal_number\x20TEXT\x20NOT\x20NULL,\x20products_list\x20BLOB\x20NOT\x20NULL,\x20total\x20INTEGER\x20NOT\x20NULL,\x20date\x20TEXT\x20NOT\x20NULL,\x20time\x20TEXT\x20NOT\x20NULL,\x20user\x20TEXT\x20NOT\x20NULL,\x20profit\x20NUMBER\x20DEFAULT\x200)",
    "update_user",
    "setSize",
    "getFullYear",
    "save",
    "UPDATE\x20products\x20SET\x20name\x20=\x20?,\x20stock\x20=\x20?,\x20price\x20=\x20?,\x20profit\x20=\x20?,\x20alert\x20=\x20?\x20WHERE\x20barcode\x20=\x20?",
    "User\x20updated\x20successfully!",
    "#EB5353",
    "User\x20added\x20successfully!",
    "./models/Clients",
    "getSeconds",
    "exec",
    "userData",
    "log",
    "error",
    "SELECT\x20*\x20FROM\x20products",
    "addPage",
    "2116264hbGLJX",
    "drawText",
    "run",
    "existsSync",
    "Connection\x20available",
    "DB\x20is\x20empty!",
    "Validation\x20failed!",
    "get_theme",
    "Alerte",
    "price",
    "Duplicate",
    "\x20product\x20have\x20been\x20deleted",
    "padStart",
    "Validation\x20success",
    "handle",
    "writeFileSync",
    "3827580vQwUxZ",
    "getAllWindows",
    "/home/selling/",
    "theme",
    "Failed\x20to\x20sync\x20changes\x20to\x20MongoDB:",
    "add_client",
    "drawLine",
    "all_transactions",
    "platform",
    "prepare",
    "7MOQbHl",
    "payload",
    "blue_theme",
    "./build/index.html",
    "findOneAndUpdate",
    "connect",
    "Product\x20updated\x20successfully!",
    "profit",
    "All\x20products\x20deleted!",
    "./models/Products",
    "90DQVswQ",
    "get_transaction_number",
    "SELECT\x20*\x20FROM\x20clients",
    "INSERT\x20INTO\x20users\x20(username,\x20password)\x20VALUES\x20(?,\x20?)",
    "Bénéfice",
    "SELECT\x20*\x20FROM\x20clients\x20WHERE\x20name\x20LIKE\x20\x27%\x27\x20||\x20$name\x20||\x20\x27%\x27",
    "join",
    "changes",
    "Failed\x20to\x20update\x20product!",
    "getDate",
    "height",
    "check-internet-connected",
    "Stock",
    "quantity",
    "Admin",
    "homedir",
    "name",
    "window-all-closed",
    "DELETE\x20FROM\x20transactions\x20WHERE\x20deal_number\x20=\x20",
    "Failed\x20to\x20add\x20user!",
    "INSERT\x20INTO\x20users\x20VALUES\x20(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    "products",
    "Failed\x20to\x20check\x20privilege",
    "development",
    "716882tGrgEV",
    "mongodb://spetsz:azizb101@ac-amkm20n-shard-00-00.3dkoneo.mongodb.net:27017,ac-amkm20n-shard-00-01.3dkoneo.mongodb.net:27017,ac-amkm20n-shard-00-02.3dkoneo.mongodb.net:27017/?ssl=true&replicaSet=atlas-g43mal-shard-0&authSource=admin&retryWrites=true&w=majority",
    "4089875BjaaCq",
    "SELECT\x20",
    "update_admin_password",
    "language",
  ];
  _0x50d2 = function () {
    return _0x2b5ce7;
  };
  return _0x50d2();
}
const checkInternetConnectedConfig = {
    timeout: 0x1388,
    retries: 0x3,
    domain: _0x3df742(0x138),
  },
  UserModel = require("./models/Users"),
  ProductModel = require(_0x3df742(0x118)),
  ClientModel = require(_0x3df742(0xed)),
  TransactionModel = require(_0x3df742(0x99)),
  MessageModel = require("./models/Messages"),
  mongoDB_URI = _0x3df742(0x132),
  initSQLite = () => {
    const _0x3f2901 = _0x3df742;
    db["exec"](_0x3f2901(0x13d)),
      db[_0x3f2901(0xef)](_0x3f2901(0xba)),
      db[_0x3f2901(0xef)](_0x3f2901(0xe4)),
      db[_0x3f2901(0xef)](
        "CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20users\x20(username\x20TEXT\x20NOT\x20NULL\x20UNIQUE\x20,\x20password\x20TEXT\x20NOT\x20NULL,\x20SELL\x20INTEGER\x20DEFAULT\x201,\x20CHANGE_ADMIN_PASSWORD\x20INTEGER\x20DEFAULT\x200,\x20GRANT_PRIVILEGES\x20INTEGER\x20DEFAULT\x200\x20,\x20ACCESS_INVENTORY\x20INTEGER\x20DEFAULT\x200,\x20ADD_PRODUCTS\x20INTEGER\x20DEFAULT\x200,\x20DELETE_PRODUCTS\x20INTEGER\x20DEFAULT\x200,\x20MODIFY_PRODUCTS\x20INTEGER\x20DEFAULT\x200,\x20IMPORT_PRODUCTS\x20INTEGER\x20DEFAULT\x200,\x20PRINT_INVENTORY\x20INTEGER\x20DEFAULT\x200,\x20ACCESS_CLIENTS\x20INTEGER\x20DEFAULT\x200,\x20ADD_CLIENTS\x20INTEGER\x20DEFAULT\x200,\x20MODIFY_CLIENTS\x20INTEGER\x20DEFAULT\x200,\x20DELETE_CLIENTS\x20INTEGER\x20DEFAULT\x200,\x20CREDIT_CLIENTS\x20INTEGER\x20DEFAULT\x200,\x20PRINT_CLIENTS_LIST\x20INTEGER\x20DEFAULT\x200,\x20ACCESS_SETTINGS\x20INTEGER\x20DEFAULT\x200,\x20ADD_USERS\x20INTEGER\x20DEFAULT\x200,\x20DELETE_USERS\x20INTEGER\x20DEFAULT\x200,\x20MODIFY_USERS\x20INTEGER\x20DEFAULT\x200,\x20ACCESS_PARAMETERS\x20INTEGER\x20DEFAULT\x200,\x20ACCESS_TRANSACTIONS\x20INTEGER\x20DEFAULT\x200)"
      );
    const _0x10e333 = db[_0x3f2901(0x10e)](_0x3f2901(0x12d));
    _0x10e333["run"](
      "Admin",
      _0x3f2901(0x127),
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1,
      0x1
    );
  },
  isMac = process[_0x3df742(0x10d)] === "darwin",
  isDev = process["env"][_0x3df742(0xcb)] !== _0x3df742(0x130);
let mainWindow;
const createMainWindow = async () => {
  const _0x178ce3 = _0x3df742;
  !store["has"](_0x178ce3(0xde)) &&
    (store[_0x178ce3(0x137)](_0x178ce3(0xde), !![]),
    store[_0x178ce3(0x137)](_0x178ce3(0x9e), 0x1),
    store["set"](_0x178ce3(0x136), "fr"),
    store["set"](_0x178ce3(0x108), _0x178ce3(0x111)),
    initSQLite());
  setInterval(() => {
    const _0x30f038 = _0x178ce3;
    checkInternetConnected(checkInternetConnectedConfig)
      [_0x30f038(0xc7)](async () => {
        const _0x5c926e = _0x30f038;
        console[_0x5c926e(0xf1)](_0x5c926e(0xf9)),
          (internetConnection = !![]),
          await mongoose[_0x5c926e(0x114)](mongoDB_URI, {
            useNewUrlParser: !![],
            useUnifiedTopology: !![],
          });
      })
      ["catch"]((_0x269154) => {
        const _0x2bb3eb = _0x30f038;
        console["log"](_0x2bb3eb(0xc6), _0x269154), (internetConnection = ![]);
      });
  }, 0x3a98),
    (mainWindow = new BrowserWindow({
      title: "Soft\x20POS",
      transparent: !![],
      width: 0x190,
      height: 0x1c2,
      fullscreenable: !![],
      frame: ![],
      resizable: !![],
      webPreferences: {
        nodeIntegration: !![],
        contextIsolation: !![],
        preload: path[_0x178ce3(0x11f)](__dirname, _0x178ce3(0xac)),
      },
    }));
  if (isDev) {
  }
  mainWindow["loadURL"](
    _0x178ce3(0xb3) + path[_0x178ce3(0x11f)](__dirname, _0x178ce3(0x112))
  );
};
function _0x4714(_0x31a2ca, _0x5d08bc) {
  const _0x50d28b = _0x50d2();
  return (
    (_0x4714 = function (_0x47148f, _0x2914b1) {
      _0x47148f = _0x47148f - 0x86;
      let _0x185cca = _0x50d28b[_0x47148f];
      return _0x185cca;
    }),
    _0x4714(_0x31a2ca, _0x5d08bc)
  );
}
app["whenReady"]()[_0x3df742(0xc7)](() => {
  const _0x28adc8 = _0x3df742;
  createMainWindow(),
    app["on"]("activate", () => {
      const _0x372d87 = _0x4714;
      if (BrowserWindow[_0x372d87(0x106)]()[_0x372d87(0x8f)] === 0x0)
        createMainWindow();
    }),
    ipcMain["on"]("command", (_0x16a967, _0x28b5a0) => {
      const _0x79c2df = _0x4714;
      switch (_0x28b5a0[_0x79c2df(0xdf)]) {
        case "exit":
          app["quit"]();
          break;
        case "resize":
          mainWindow[_0x79c2df(0xe6)](
            _0x28b5a0[_0x79c2df(0x110)][_0x79c2df(0xa3)],
            _0x28b5a0["payload"][_0x79c2df(0x123)]
          );
          const { width: _0x4ff435, height: _0x7288f0 } =
              screen[_0x79c2df(0xe0)]()[_0x79c2df(0xb0)],
            _0x3fcccd = Math["floor"](
              (_0x4ff435 - mainWindow[_0x79c2df(0xa7)]()[0x0]) / 0x2
            ),
            _0x23a257 = Math["floor"](
              (_0x7288f0 - mainWindow[_0x79c2df(0xa7)]()[0x1]) / 0x2
            );
          mainWindow["setPosition"](_0x3fcccd, _0x23a257);
          break;
        case "fullscreen":
          mainWindow["maximize"]();
          break;
        default:
          return;
      }
    }),
    ipcMain["handle"](_0x28adc8(0xa8), async (_0x1d2815, _0xcea9fe) => {
      const _0x25e64e = _0x28adc8,
        { user: _0x56a313, password: _0x217e66 } = _0xcea9fe,
        _0x7ea41e = _0x25e64e(0xb2),
        _0x2510e4 = db["prepare"](_0x7ea41e),
        _0x11e78b = _0x2510e4["all"](_0x56a313, _0x217e66);
      return _0x11e78b[_0x25e64e(0x8f)] > 0x0
        ? {
            msg: _0x25e64e(0x102),
            redirect: _0x25e64e(0x107),
            user: _0x11e78b[0x0]["username"],
            deal_number: store[_0x25e64e(0xd5)](_0x25e64e(0x9e)),
          }
        : { text: _0x25e64e(0xfb), color: _0x25e64e(0xeb) };
    }),
    ipcMain["handle"]("filter_product", async (_0x2fd161, _0x27856d) => {
      const _0x10af7d = _0x28adc8,
        _0x11623a =
          "SELECT\x20*\x20FROM\x20products\x20WHERE\x20stock\x20>\x200\x20AND\x20(name\x20LIKE\x20\x27%\x27\x20||\x20?\x20||\x20\x27%\x27\x20OR\x20barcode\x20LIKE\x20\x27%\x27\x20||\x20?\x20||\x20\x27%\x27)",
        _0x279107 = db["prepare"](_0x11623a),
        _0x29b994 = _0x279107[_0x10af7d(0x13b)](_0x27856d, _0x27856d);
      return _0x29b994["length"] > 0x0
        ? _0x29b994
        : { text: _0x10af7d(0xe3), color: _0x10af7d(0xeb) };
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xc5), async (_0x3ed535) => {
      const _0x701a32 = _0x28adc8,
        _0x5c3e0b = _0x701a32(0xf3),
        _0x547273 = db[_0x701a32(0x10e)](_0x5c3e0b),
        _0x340b68 = _0x547273[_0x701a32(0x13b)]();
      return _0x340b68["length"] > 0x0 ? _0x340b68 : { text: _0x701a32(0xfa) };
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0x9b), async (_0x6f86fd) => {
      const _0x38dff5 = _0x28adc8,
        _0x31c9a9 = _0x38dff5(0x11b),
        _0x52a935 = db[_0x38dff5(0x10e)](_0x31c9a9),
        _0x42928e = _0x52a935[_0x38dff5(0x13b)]();
      return _0x42928e[_0x38dff5(0x8f)] > 0x0
        ? _0x42928e
        : { text: _0x38dff5(0xfa) };
    }),
    ipcMain[_0x28adc8(0x103)](
      _0x28adc8(0x10a),
      async (_0x373e6f, _0x4cb9ac) => {
        return new Promise(async (_0x2df15e, _0x21add9) => {
          const _0x3d2682 = _0x4714;
          if (Array[_0x3d2682(0xd6)](_0x4cb9ac)) {
            const _0x5e7290 = db[_0x3d2682(0x10e)](
                "INSERT\x20INTO\x20clients\x20VALUES\x20(?,\x20?,\x20?,\x20?,\x20?,\x20?)"
              ),
              _0x2c8993 = _0x4cb9ac[_0x3d2682(0xd4)](
                ({
                  name: _0x44ff86,
                  phone: _0x31cde6,
                  debt: _0x4cbb7d,
                  transactions_all_time: _0x12e119,
                  transactions_last_month: _0x31a594,
                  products: _0x5848f7,
                }) => [
                  _0x44ff86,
                  _0x31cde6,
                  _0x4cbb7d,
                  _0x12e119,
                  _0x31a594,
                  _0x5848f7,
                ]
              ),
              _0x14e851 = _0x5e7290[_0x3d2682(0xf7)](_0x2c8993);
            if (_0x14e851[_0x3d2682(0x120)] > 0x0) {
            } else _0x21add9(new Error(_0x3d2682(0x89)));
          } else {
            const {
                name: _0x37d3bf,
                phone: _0x10cf5c,
                debt: _0x56bae5,
                transactions_all_time: _0x54284b,
                transactions_last_month: _0x22617b,
                products: _0x418fa7,
              } = _0x4cb9ac,
              _0x1d5c6c = db[_0x3d2682(0x10e)](_0x3d2682(0xd7));
            try {
              let _0x255d97;
              _0x418fa7
                ? (_0x255d97 = _0x1d5c6c[_0x3d2682(0xf7)](
                    _0x37d3bf,
                    _0x10cf5c,
                    _0x56bae5,
                    _0x54284b,
                    _0x22617b,
                    _0x418fa7
                  ))
                : (_0x255d97 = _0x1d5c6c["run"](
                    _0x37d3bf,
                    _0x10cf5c,
                    _0x56bae5,
                    _0x54284b,
                    _0x22617b,
                    ""
                  )),
                _0x255d97[_0x3d2682(0x120)] > 0x0
                  ? _0x2df15e({
                      text: "Client\x20have\x20been\x20added\x20to\x20the\x20database!",
                    })
                  : _0x21add9({ text: _0x3d2682(0x8a) });
            } catch (_0x51b461) {
              _0x2df15e({ text: _0x3d2682(0x8a), errorType: _0x3d2682(0xff) });
            }
          }
        });
      }
    ),
    ipcMain[_0x28adc8(0x103)]("filter_client", async (_0x2e25c8, _0x1df431) => {
      const _0x1faf18 = _0x28adc8,
        _0x4b385a = _0x1faf18(0x11e),
        _0x1ee2a2 = db["prepare"](_0x4b385a),
        _0x5b74af = _0x1ee2a2[_0x1faf18(0x13b)]({ name: _0x1df431 });
      return new Promise((_0x45a203, _0x203506) => {
        const _0x52467d = _0x1faf18;
        _0x5b74af["length"] > 0x0
          ? _0x45a203(_0x5b74af)
          : _0x45a203({ text: _0x52467d(0xaa), color: "#EB5353" });
      });
    }),
    ipcMain[_0x28adc8(0x103)]("edit_client", async (_0x570ef5, _0x135d17) => {
      const _0xa573ca = _0x28adc8,
        {
          name: _0x5dfe00,
          phone: _0xcf1a0f,
          debt: _0x5dacd2,
          transactions_all_time: _0x4442be,
          transactions_last_month: _0x2f5ec0,
          products: _0x8838f5,
        } = _0x135d17,
        _0x27e2c6 = "SELECT\x20*\x20FROM\x20CLIENTS\x20WHERE\x20name\x20=\x20?",
        _0x4148d0 = db[_0xa573ca(0x10e)](_0x27e2c6),
        _0x4a909a = _0x4148d0[_0xa573ca(0x13b)](_0x5dfe00);
      if (_0x4a909a[0x0]) {
        let _0x1c6e3b;
        const _0x5f2fcf =
            "UPDATE\x20clients\x20SET\x20name\x20=\x20$name,\x20phone\x20=\x20$phone,\x20products\x20=\x20$products\x20,\x20debt\x20=\x20$debt,\x20transactions_all_time\x20=\x20$transactions_all_time,\x20transactions_last_month\x20=\x20$transactions_last_month\x20WHERE\x20name\x20=\x20$name",
          _0x3a4f0e = db[_0xa573ca(0x10e)](_0x5f2fcf);
        if (_0x4a909a[0x0][_0xa573ca(0x12e)]["length"] > 0x0) {
          const _0x3d8b3 = JSON["parse"](_0x4a909a[0x0][_0xa573ca(0x12e)]);
          _0x3d8b3[_0xa573ca(0x87)](..._0x8838f5),
            console[_0xa573ca(0xf1)](_0x3d8b3),
            (_0x1c6e3b = _0x3a4f0e[_0xa573ca(0xf7)]({
              name: _0x5dfe00,
              phone: _0xcf1a0f,
              debt: _0x5dacd2,
              transactions_all_time: _0x4442be,
              transactions_last_month: _0x2f5ec0,
              products: JSON["stringify"](_0x3d8b3),
            }));
        } else
          _0x1c6e3b = _0x3a4f0e["run"]({
            name: _0x5dfe00,
            phone: _0xcf1a0f,
            debt: _0x5dacd2,
            transactions_all_time: _0x4442be,
            transactions_last_month: _0x2f5ec0,
            products: JSON[_0xa573ca(0xa0)](_0x8838f5),
          });
        return new Promise(async (_0x2f596d, _0x4e0418) => {
          const _0x576962 = _0xa573ca;
          _0x1c6e3b["changes"] > 0x0
            ? _0x2f596d({ text: _0x576962(0xa5) + _0x5dfe00 + _0x576962(0x9c) })
            : _0x4e0418(new Error("Failed\x20to\x20update\x20client!"));
        });
      }
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xb4), async (_0x1b7f25, _0x10d5cf) => {
      const _0x9bc452 = _0x28adc8;
      if (_0x10d5cf === "ALL") {
        const _0x3cabcd = db[_0x9bc452(0x10e)](_0x9bc452(0xd3)),
          _0x4c5c49 = _0x3cabcd[_0x9bc452(0xf7)]();
        return new Promise(async (_0x100703, _0x40318b) => {
          const _0x3da207 = _0x9bc452;
          _0x4c5c49[_0x3da207(0x120)] > 0x0
            ? _0x100703({ text: _0x3da207(0x97) })
            : _0x40318b(new Error(_0x3da207(0xb9)));
        });
      } else {
        if (_0x10d5cf[_0x9bc452(0x8f)] > 0x1) {
          const _0x5bfd6e = _0x10d5cf[_0x9bc452(0xd4)]((_0x3ce8b5) => {
            const _0x11047f = _0x9bc452,
              _0x47f0dd = db[_0x11047f(0x10e)](
                "DELETE\x20FROM\x20clients\x20WHERE\x20name\x20=\x20$name"
              ),
              _0x1cb93b = _0x47f0dd["run"]({
                name: _0x3ce8b5[_0x11047f(0x129)],
              });
            return new Promise((_0x5433c7, _0x2ce329) => {
              const _0x1ce622 = _0x11047f;
              _0x1cb93b[_0x1ce622(0x120)] > 0x0
                ? _0x5433c7({
                    text: _0x10d5cf[_0x1ce622(0x8f)] + _0x1ce622(0x95),
                  })
                : _0x2ce329(
                    new Error(
                      _0x1ce622(0x88) + _0x3ce8b5[_0x1ce622(0x129)] + "!"
                    )
                  );
            });
          });
          return Promise["all"](_0x5bfd6e);
        } else {
          const _0x31b80d = db[_0x9bc452(0x10e)](_0x9bc452(0xc4)),
            _0x608b9f = _0x31b80d[_0x9bc452(0xf7)]({
              name: _0x10d5cf[0x0][_0x9bc452(0x129)],
            });
          return new Promise(async (_0x451c58, _0xc2aabf) => {
            const _0x2d427f = _0x9bc452;
            _0x608b9f[_0x2d427f(0x120)] > 0x0
              ? _0x451c58({
                  text:
                    _0x2d427f(0xa5) +
                    _0x10d5cf[0x0][_0x2d427f(0x129)] +
                    "\x20has\x20been\x20deleted!",
                })
              : _0xc2aabf(
                  new Error(
                    _0x2d427f(0x88) + _0x10d5cf[0x0][_0x2d427f(0x129)] + "!"
                  )
                );
          });
        }
      }
    }),
    ipcMain[_0x28adc8(0x103)]("remove_debt", (_0x344e5e, _0x1de2f0) => {
      const _0x1c411c = _0x28adc8,
        { products: _0x3f62bd, client: _0x199170 } = _0x1de2f0;
      let _0x143387 = 0x0;
      _0x3f62bd[_0x1c411c(0xdb)]((_0x3cad59) => {
        const _0x4fc85b = _0x1c411c;
        _0x143387 += _0x3cad59[_0x4fc85b(0x126)] * _0x3cad59[_0x4fc85b(0xfe)];
      }),
        (sql = _0x1c411c(0xb5)),
        (stmt = db["prepare"](sql)),
        (result = stmt[_0x1c411c(0xf7)](
          JSON[_0x1c411c(0xa0)](_0x3f62bd),
          _0x143387,
          _0x199170
        ));
      if (result[_0x1c411c(0x120)] > 0x0) return { text: "Product\x20removed" };
    }),
    ipcMain[_0x28adc8(0x103)](
      "delete_product",
      async (_0x27b4ec, _0x56f5e8) => {
        const _0x482b74 = _0x28adc8;
        if (_0x56f5e8 === _0x482b74(0xb6)) {
          const _0x3440f3 = "DELETE\x20FROM\x20products";
          return db[_0x482b74(0xef)](_0x3440f3), { text: _0x482b74(0x117) };
        } else {
          if (_0x56f5e8["length"] > 0x0)
            try {
              const _0x493aa2 = db[_0x482b74(0x10e)](
                  "DELETE\x20FROM\x20products\x20WHERE\x20barcode\x20=\x20?"
                ),
                _0x49f962 = _0x56f5e8["map"]((_0x14ea2c) => {
                  const { barcode: _0x10ab49 } = _0x14ea2c;
                  return _0x493aa2["run"](_0x10ab49);
                });
              return (
                await Promise[_0x482b74(0x13b)](_0x49f962),
                { text: _0x56f5e8[_0x482b74(0x8f)] + _0x482b74(0x100) }
              );
            } catch (_0x1b892c) {
              return { text: _0x482b74(0x94) };
            }
          else return { text: _0x482b74(0xbc) };
        }
      }
    ),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xbb), async (_0x4c8691, _0x182f3a) => {
      const _0x21a6d4 = _0x28adc8,
        _0x4cc2d0 = await PDFDocument[_0x21a6d4(0xbf)]();
      let _0x5cae61 = _0x4cc2d0[_0x21a6d4(0xf4)]();
      const _0x575949 = [
          [
            _0x21a6d4(0xa2),
            "Code\x20Barre",
            _0x21a6d4(0x125),
            _0x21a6d4(0xfd),
            _0x21a6d4(0x90),
            _0x21a6d4(0x11d),
          ],
          ..._0x182f3a["map"]((_0x25ce22) => [
            _0x25ce22["name"],
            _0x25ce22[_0x21a6d4(0xaf)][_0x21a6d4(0x86)](),
            _0x25ce22["stock"][_0x21a6d4(0x86)](),
            _0x25ce22["alert"][_0x21a6d4(0x86)](),
            _0x25ce22[_0x21a6d4(0xfe)][_0x21a6d4(0x86)](),
            _0x25ce22[_0x21a6d4(0x116)][_0x21a6d4(0x86)](),
          ]),
        ],
        _0x59266f = [0xb4, 0x64, 0x50, 0x50, 0x50, 0x50],
        _0x3e63ec = 0x14,
        _0x231a97 = 0x5;
      let _0x2745d5 = _0x5cae61[_0x21a6d4(0xc1)]() + 0x14;
      for (const _0x4339e0 of _0x575949) {
        _0x2745d5 - _0x3e63ec - 0xd < 0x0 &&
          ((_0x5cae61 = _0x4cc2d0[_0x21a6d4(0xf4)]()),
          (_0x2745d5 = _0x5cae61[_0x21a6d4(0xc1)]() + 0x14));
        let _0x13ce34 = 0x0;
        for (
          let _0x2495ee = 0x0;
          _0x2495ee < _0x4339e0[_0x21a6d4(0x8f)];
          _0x2495ee++
        ) {
          const _0x4fb931 = _0x4339e0[_0x2495ee],
            _0x178752 = _0x59266f[_0x2495ee];
          _0x5cae61[_0x21a6d4(0xf6)](_0x4fb931, {
            x: _0x13ce34 + _0x231a97,
            y: _0x2745d5 - _0x3e63ec - 0xd,
            size: 0xc,
            color: rgb(0x0, 0x0, 0x0),
          }),
            (_0x13ce34 += _0x178752);
        }
        (_0x2745d5 -= _0x3e63ec),
          _0x5cae61[_0x21a6d4(0x10b)]({
            start: { x: 0x0, y: _0x2745d5 },
            end: { x: _0x5cae61[_0x21a6d4(0xd8)](), y: _0x2745d5 },
            thickness: 0x1,
            color: rgb(0x0, 0x0, 0x0),
          });
      }
      let _0x1f5323 = 0x0;
      for (const _0x227391 of _0x59266f) {
        _0x5cae61["drawLine"]({
          start: { x: _0x1f5323, y: _0x5cae61[_0x21a6d4(0xc1)]() },
          end: {
            x: _0x1f5323,
            y:
              _0x5cae61[_0x21a6d4(0xc1)]() -
              0x32 -
              _0x182f3a[_0x21a6d4(0x8f)] * _0x3e63ec,
          },
          thickness: 0x1,
          color: rgb(0x0, 0x0, 0x0),
        }),
          (_0x1f5323 += _0x227391);
      }
      const _0x4da975 = await _0x4cc2d0[_0x21a6d4(0xe8)](),
        _0x1d7a00 = path[_0x21a6d4(0x11f)](
          os[_0x21a6d4(0x128)](),
          "Desktop",
          _0x21a6d4(0xca)
        );
      return (
        fs[_0x21a6d4(0x104)](_0x1d7a00, _0x4da975),
        { text: "PDF\x20generated\x20successfully!" }
      );
    }),
    ipcMain[_0x28adc8(0x103)]("add_product", async (_0x33311c, _0x5360c8) => {
      const _0x2e9160 = _0x28adc8;
      if (_0x5360c8[_0x2e9160(0x8f)] > 0x0) {
        let _0x5f43c1;
        try {
          const _0x3fe3b1 = db["prepare"](_0x2e9160(0x93)),
            _0x16fdfb = _0x5360c8["map"]((_0x4df0ad) => {
              const {
                name: _0x4f6479,
                barcode: _0x4d3dea,
                stock: _0x3782f2,
                price: _0x5c2dc5,
                buy_price: _0x134f09,
                alert: _0x4c1b75,
              } = _0x4df0ad;
              _0x5f43c1 = _0x4f6479;
              if (
                _0x4f6479 &&
                _0x4d3dea &&
                _0x3782f2 &&
                _0x5c2dc5 &&
                _0x134f09 &&
                _0x4c1b75
              ) {
                const _0x296340 = _0x5c2dc5 - _0x134f09;
                return _0x3fe3b1["run"](
                  _0x4f6479,
                  _0x4d3dea,
                  _0x3782f2,
                  _0x5c2dc5,
                  _0x296340,
                  _0x4c1b75,
                  ""
                );
              }
            });
          return (
            await Promise[_0x2e9160(0x13b)](_0x16fdfb),
            { text: "Products\x20imported" }
          );
        } catch (_0xfe9e2c) {
          return { text: "Product\x20" + _0x5f43c1 + _0x2e9160(0xb1) };
        }
      } else
        try {
          const {
              name: _0x2a0668,
              barcode: _0x301654,
              stock: _0x286b1b,
              price: _0x3d384f,
              profit: _0x1d4ada,
              alert: _0x2fb848,
              image: _0x2047fb,
            } = _0x5360c8,
            _0x6a0e84 = _0x2e9160(0x93),
            _0x5beaaa = db[_0x2e9160(0x10e)](_0x6a0e84),
            _0x54d398 = _0x5beaaa[_0x2e9160(0xf7)](
              _0x2a0668,
              _0x301654,
              _0x286b1b,
              _0x3d384f,
              _0x1d4ada,
              _0x2fb848,
              _0x2047fb
            );
          if (_0x54d398["changes"] > 0x0)
            return { text: "Product\x20added\x20successfully!" };
        } catch (_0x449323) {
          return { text: _0x2e9160(0xa6) };
        }
    }),
    ipcMain[_0x28adc8(0x103)](
      "update_product",
      async (_0x2671cd, _0x2a1f14) => {
        const _0x3f8f4f = _0x28adc8,
          {
            name: _0x4a6363,
            barcode: _0x4b6f8f,
            stock: _0x116b00,
            price: _0x44de37,
            buy_price: _0x2d9eaa,
            alert: _0x5680eb,
            image: _0x3e9d26,
          } = _0x2a1f14;
        let _0x50bfbc, _0x14690b, _0x48650f;
        const _0x174def = _0x44de37 - _0x2d9eaa;
        return (
          _0x3e9d26
            ? ((_0x50bfbc = _0x3f8f4f(0xda)),
              (_0x48650f = db[_0x3f8f4f(0x10e)](_0x50bfbc)),
              (_0x14690b = _0x48650f["run"](
                _0x4a6363,
                _0x116b00,
                _0x44de37,
                _0x174def,
                _0x5680eb,
                _0x3e9d26,
                _0x4b6f8f
              )))
            : ((_0x50bfbc = _0x3f8f4f(0xe9)),
              (_0x48650f = db[_0x3f8f4f(0x10e)](_0x50bfbc)),
              (_0x14690b = _0x48650f[_0x3f8f4f(0xf7)](
                _0x4a6363,
                _0x116b00,
                _0x44de37,
                _0x174def,
                _0x5680eb,
                _0x4b6f8f
              ))),
          _0x14690b[_0x3f8f4f(0x120)] > 0x0
            ? { text: _0x3f8f4f(0x115) }
            : { text: _0x3f8f4f(0x121) }
        );
      }
    ),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xc2), async (_0x16b8fb) => {
      const _0x49e983 = _0x28adc8,
        _0x2a8fb8 = _0x49e983(0xc8),
        _0x6c7007 = db["prepare"](_0x2a8fb8),
        _0x1d92aa = _0x6c7007[_0x49e983(0x13b)]();
      return _0x1d92aa[_0x49e983(0x8f)] > 0x0
        ? _0x1d92aa
        : { text: "DB\x20is\x20empty!" };
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xe5), async (_0x41bac2, _0x474ce4) => {
      const _0x372581 = _0x28adc8,
        { oldUser_username: _0x41510c, newUser: _0x2b4c16 } = _0x474ce4,
        { password: _0x37f121, username: _0x58d1cc } = _0x2b4c16,
        _0x3b5c07 = _0x372581(0xb8) + _0x41510c + "\x27",
        _0x569d4b = db[_0x372581(0x10e)](_0x3b5c07),
        _0x211632 = _0x569d4b[_0x372581(0xf7)](_0x37f121, _0x58d1cc);
      return (
        console[_0x372581(0xf1)](_0x211632),
        _0x211632["changes"] > 0x0
          ? { text: _0x372581(0xea) }
          : { text: _0x372581(0xbe) }
      );
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xa9), async (_0x4f8cee, _0x15ade9) => {
      const _0x4d77bd = _0x28adc8,
        { username: _0x120e17, password: _0x15df95 } = _0x15ade9,
        _0x3ee304 = _0x4d77bd(0x11c),
        _0x1c5271 = db[_0x4d77bd(0x10e)](_0x3ee304),
        _0x561423 = _0x1c5271["run"](_0x120e17, _0x15df95);
      return _0x561423[_0x4d77bd(0x120)] > 0x0
        ? { text: _0x4d77bd(0xec) }
        : { text: _0x4d77bd(0x12c) };
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0x98), async (_0x435201, _0xccc081) => {
      const _0x501142 = _0x28adc8,
        _0x282996 = _0xccc081,
        _0x1aabb9 = "DELETE\x20FROM\x20users\x20WHERE\x20username\x20=\x20?",
        _0x2bbf8a = db[_0x501142(0x10e)](_0x1aabb9),
        _0xd3db90 = _0x2bbf8a[_0x501142(0xf7)](_0x282996);
      return _0xd3db90[_0x501142(0x120)] > 0x0
        ? { text: "User\x20deleted\x20successfully!" }
        : { text: _0x501142(0x92) };
    }),
    ipcMain["handle"](_0x28adc8(0x135), async (_0x3e1640, _0x2699db) => {
      const _0x327081 = _0x28adc8,
        { password: _0x2c8980 } = _0x2699db,
        _0x22d5a7 = _0x327081(0x9f),
        _0x1320b1 = db[_0x327081(0x10e)](_0x22d5a7),
        _0x5019ee = _0x1320b1[_0x327081(0xf7)](_0x2c8980);
      return _0x5019ee[_0x327081(0x120)] > 0x0
        ? { text: "Password\x20updated\x20successfully!" }
        : { text: _0x327081(0xcd) };
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xd1), async (_0x305591, _0x3f4db6) => {
      const _0x4a7896 = _0x28adc8,
        { privilege: _0x328f27, user: _0x67ae0a, value: _0xe946e0 } = _0x3f4db6;
      let _0x5d706a;
      _0xe946e0 === "on" ? (_0x5d706a = 0x1) : (_0x5d706a = 0x0);
      const _0xbc3255 =
          "UPDATE\x20users\x20SET\x20" + _0x328f27 + _0x4a7896(0xe2),
        _0x453866 = db[_0x4a7896(0x10e)](_0xbc3255),
        _0xaf5596 = _0x453866[_0x4a7896(0xf7)](_0x5d706a, _0x67ae0a);
      if (_0xaf5596[_0x4a7896(0x120)] > 0x0) {
      }
    });
  const _0x190d9d = (_0x374fba, _0x184610) => {
    const _0x356b7d = _0x28adc8,
      _0x3a023c = db[_0x356b7d(0x10e)](
        _0x356b7d(0x134) + _0x184610 + _0x356b7d(0xab)
      ),
      _0x5b8d63 = _0x3a023c["get"](_0x374fba),
      _0x18a91a = _0x5b8d63 && _0x5b8d63[_0x184610] === 0x1;
    return _0x18a91a;
  };
  ipcMain[_0x28adc8(0x103)](_0x28adc8(0x9d), async (_0x4e3666, _0x232bc3) => {
    const _0x2b5aa6 = _0x28adc8,
      { username: _0x5d0698, privilege: _0x368d7c } = _0x232bc3;
    try {
      const _0x26016c = _0x190d9d(_0x5d0698, _0x368d7c);
      return { granted: _0x26016c };
    } catch (_0x583348) {
      return { error: _0x2b5aa6(0x12f) };
    }
  }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0x11a), async (_0x5be44a) => {
      const _0x5e91e7 = _0x28adc8,
        _0x28dd1b = await store[_0x5e91e7(0xd5)](_0x5e91e7(0x9e));
      return _0x28dd1b;
    }),
    ipcMain["handle"]("delete_transaction", async (_0x5e9b4a, _0x4572e1) => {
      const _0x3f97e5 = _0x28adc8,
        { transactions: _0x5c942f } = _0x4572e1;
      return _0x4572e1[_0x3f97e5(0xe1)]
        ? (db["exec"]("DELETE\x20FROM\x20transactions"),
          { text: _0x3f97e5(0xdc) })
        : (_0x5c942f[_0x3f97e5(0xdb)]((_0x525609) => {
            const _0x1cf47b = _0x3f97e5;
            db[_0x1cf47b(0xef)](_0x1cf47b(0x12b) + _0x525609["deal_number"]);
          }),
          { text: _0x5c942f[_0x3f97e5(0x8f)] + _0x3f97e5(0xa1) });
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xbd), async (_0x46c691, _0x3a8bc3) => {
      const _0x4286f6 = _0x28adc8,
        {
          products_list: _0x1dd2ca,
          user: _0x2da3e7,
          total: _0x2bfae6,
        } = _0x3a8bc3;
      try {
        const _0x3b1755 = db[_0x4286f6(0x10e)](_0x4286f6(0xc3)),
          _0x3c15fd = _0x1dd2ca[_0x4286f6(0xd4)]((_0xb0b93c) => {
            const { barcode: _0xa1423, stock: _0x4d6627 } = _0xb0b93c;
            return _0x3b1755["run"](_0x4d6627, _0xa1423);
          });
        await Promise[_0x4286f6(0x13b)](_0x3c15fd);
        const _0x39bc87 = _0x1dd2ca[_0x4286f6(0xd4)]((_0x42d4d8) => {
          const {
            image: _0x4938d5,
            stock: _0x2c7cc4,
            alert: _0x202ce4,
            ..._0x509810
          } = _0x42d4d8;
          return _0x509810;
        });
        let _0x5762d7 = 0x0;
        _0x39bc87[_0x4286f6(0xdb)](
          (_0x2c8aa9) =>
            (_0x5762d7 +=
              _0x2c8aa9[_0x4286f6(0x116)] * _0x2c8aa9[_0x4286f6(0x126)])
        );
        const _0x314e32 = new Date(),
          _0x2fb656 = _0x314e32[_0x4286f6(0xe7)](),
          _0x3ba428 = String(_0x314e32[_0x4286f6(0x8b)]() + 0x1)[
            _0x4286f6(0x101)
          ](0x2, "0"),
          _0x501cba = String(_0x314e32[_0x4286f6(0x122)]())[_0x4286f6(0x101)](
            0x2,
            "0"
          ),
          _0x49598f = _0x2fb656 + "-" + _0x3ba428 + "-" + _0x501cba,
          _0x192d04 = String(_0x314e32["getHours"]())[_0x4286f6(0x101)](
            0x2,
            "0"
          ),
          _0x20d96d = String(_0x314e32[_0x4286f6(0x139)]())[_0x4286f6(0x101)](
            0x2,
            "0"
          ),
          _0x909603 = String(_0x314e32[_0x4286f6(0xee)]())[_0x4286f6(0x101)](
            0x2,
            "0"
          ),
          _0x14d051 = _0x192d04 + ":" + _0x20d96d + ":" + _0x909603,
          _0x247a11 = db[_0x4286f6(0x10e)](
            "INSERT\x20INTO\x20transactions\x20VALUES(?,?,?,?,?,?,?)"
          ),
          _0x4df907 = _0x247a11[_0x4286f6(0xf7)](
            store["get"](_0x4286f6(0x9e)),
            JSON[_0x4286f6(0xa0)](_0x39bc87),
            _0x2bfae6,
            _0x49598f,
            _0x14d051,
            _0x2da3e7,
            _0x5762d7
          );
        if (_0x4df907[_0x4286f6(0x120)] > 0x0) {
        } else console[_0x4286f6(0xf1)](_0x4286f6(0x8c));
        return (
          store[_0x4286f6(0x137)](
            _0x4286f6(0x9e),
            store[_0x4286f6(0xd5)](_0x4286f6(0x9e)) + 0x1
          ),
          { text: _0x4286f6(0xae), deal_number: store["get"](_0x4286f6(0x9e)) }
        );
      } catch (_0x29bd20) {
        throw new Error(_0x4286f6(0xcf));
      }
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xad), async (_0x1857c3, _0x1c4a0d) => {
      const _0xdf80c9 = _0x28adc8;
      try {
        const _0x4bfdb3 = db[_0xdf80c9(0x10e)](_0xdf80c9(0xc3)),
          _0x3bb2a1 = _0x1c4a0d["map"]((_0x4d1986) => {
            const { barcode: _0x2659a1, stock: _0x444c83 } = _0x4d1986;
            return _0x4bfdb3["run"](_0x444c83, _0x2659a1);
          });
        return (
          await Promise[_0xdf80c9(0x13b)](_0x3bb2a1),
          store["set"](
            "deal_number",
            store[_0xdf80c9(0xd5)]("deal_number") + 0x1
          ),
          {
            text: "Validated",
            deal_number: store[_0xdf80c9(0xd5)](_0xdf80c9(0x9e)),
          }
        );
      } catch (_0x2176da) {
        throw new Error("Failed\x20to\x20validate\x20deal");
      }
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0x8d), async (_0xd4bc00, _0x6c9570) => {
      const _0x3e0b21 = _0x28adc8,
        {
          user: _0x2fdac5,
          products_list: _0x5dfefc,
          total: _0x1e0d5f,
          deal_number: _0xfa31f,
        } = _0x6c9570,
        _0x153756 = new Date(),
        _0x3a97ff = _0x153756[_0x3e0b21(0xe7)](),
        _0x1eb7f8 = String(_0x153756["getMonth"]() + 0x1)["padStart"](0x2, "0"),
        _0x1d23ba = String(_0x153756[_0x3e0b21(0x122)]())[_0x3e0b21(0x101)](
          0x2,
          "0"
        ),
        _0x26ffd8 = _0x3a97ff + "-" + _0x1eb7f8 + "-" + _0x1d23ba,
        _0x10616f = String(_0x153756["getHours"]())[_0x3e0b21(0x101)](0x2, "0"),
        _0x31a058 = String(_0x153756[_0x3e0b21(0x139)]())[_0x3e0b21(0x101)](
          0x2,
          "0"
        ),
        _0x478265 = String(_0x153756[_0x3e0b21(0xee)]())[_0x3e0b21(0x101)](
          0x2,
          "0"
        ),
        _0x1cd868 = _0x10616f + ":" + _0x31a058 + ":" + _0x478265,
        _0x41f565 = db["prepare"](
          "INSERT\x20INTO\x20transactions\x20VALUES(?,?,?,?,?,?)"
        ),
        _0xcf506b = _0x41f565["run"](
          _0xfa31f,
          JSON[_0x3e0b21(0xa0)](_0x5dfefc),
          _0x1e0d5f,
          _0x26ffd8,
          _0x1cd868,
          _0x2fdac5
        );
      _0xcf506b[_0x3e0b21(0x120)] > 0x0
        ? console["log"](_0x3e0b21(0xc0))
        : console[_0x3e0b21(0xf1)](_0x3e0b21(0x8c));
    });
  async function _0xabd311(_0x51314d) {
    const _0x1d3128 = _0x28adc8;
    try {
      const _0x44c37d = _0x51314d[_0x1d3128(0xd4)]((_0x126cb4) => {
        const _0x515dee = _0x1d3128,
          { barcode: _0x108ced, stock: _0x35f80b } = _0x126cb4;
        return ProductModel[_0x515dee(0x113)](
          { barcode: _0x108ced },
          { stock: _0x35f80b }
        );
      });
      await Promise[_0x1d3128(0x13b)](_0x44c37d);
    } catch (_0x16157f) {
      console[_0x1d3128(0xf2)](_0x1d3128(0x109), _0x16157f);
    }
  }
  ipcMain[_0x28adc8(0x103)](_0x28adc8(0x10c), async (_0xe74f59, _0x52b202) => {
    const _0x224a95 = _0x28adc8,
      _0x39d742 = db["prepare"](_0x224a95(0xd2)),
      _0x2f44ab = _0x39d742["all"]();
    return _0x2f44ab["length"] > 0x0
      ? _0x2f44ab
      : { text: "DB\x20is\x20empty!" };
  }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xce), (_0x26907a, _0x36827a) => {
      return internetConnection;
    }),
    ipcMain["handle"](_0x28adc8(0x13a), async (_0x4c520e, _0x4569b0) => {
      const _0x4def96 = _0x28adc8;
      try {
        const _0x1bb74e = new MessageModel(_0x4569b0);
        return await _0x1bb74e[_0x4def96(0xe8)](), { received: !![] };
      } catch (_0x64e651) {
        console[_0x4def96(0xf1)](_0x64e651);
      }
    }),
    ipcMain[_0x28adc8(0x103)]("change_language", (_0x24fb48, _0x5b30ed) => {
      const _0x58f416 = _0x28adc8;
      store[_0x58f416(0x137)](_0x58f416(0x136), _0x5b30ed);
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xc9), (_0xcfd193) => {
      const _0x263c80 = _0x28adc8;
      return store[_0x263c80(0xd5)](_0x263c80(0x136));
    }),
    ipcMain[_0x28adc8(0x103)]("change_theme", (_0x5b0d33, _0x145c19) => {
      const _0x3f36a2 = _0x28adc8;
      store["set"](_0x3f36a2(0x108), _0x145c19);
    }),
    ipcMain[_0x28adc8(0x103)](_0x28adc8(0xfc), (_0x1d7713) => {
      const _0x48ea53 = _0x28adc8;
      return store[_0x48ea53(0xd5)](_0x48ea53(0x108));
    }),
    app["on"](_0x28adc8(0x12a), () => {
      const _0x170991 = _0x28adc8;
      !isMac && app[_0x170991(0x13c)]();
    });
}),
  app["on"]("activate", () => {
    const _0x8c3db1 = _0x3df742;
    BrowserWindow[_0x8c3db1(0x106)]()["length"] === 0x0 && createMainWindow();
  }),
  (app["allowRendererProcessReuse"] = !![]);
