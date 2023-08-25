const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Database = require("better-sqlite3");
const { PDFDocument, rgb } = require("pdf-lib");
const checkInternetConnected = require("check-internet-connected");
const Store = require("electron-store");
const store = new Store();
const os = require("os");

// Get the path to the user data directory
const userDataPath = app.getPath("userData");

// Create a path for the database file within the user data directory
const databasePath = path.join(userDataPath, "my_database.db");

if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
}

const db = new Database(databasePath);

//const db = new Database(path.join(__dirname, './database.sqlite3'), { verbose: console.log })

let internetConnection = false;

const checkInternetConnectedConfig = {
  timeout: 5000, //timeout connecting to each try (default 5000)
  retries: 3, //number of retries to do before failing (default 5)
  domain: "apple.com", //the domain to check DNS record of
};

// Importing Models
const UserModel = require("./models/Users");
const ProductModel = require("./models/Products");
const ClientModel = require("./models/Clients");
const TransactionModel = require("./models/Transactions");
const MessageModel = require("./models/Messages");

const mongoDB_URI =
  "mongodb://spetsz:azizb101@ac-amkm20n-shard-00-00.3dkoneo.mongodb.net:27017,ac-amkm20n-shard-00-01.3dkoneo.mongodb.net:27017,ac-amkm20n-shard-00-02.3dkoneo.mongodb.net:27017/?ssl=true&replicaSet=atlas-g43mal-shard-0&authSource=admin&retryWrites=true&w=majority";

const initSQLite = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS clients (name TEXT UNIQUE, phone TEXT UNIQUE, debt INTEGER DEFAULT 0, transactions_all_time INTEGER DEFAULT 0, transactions_last_month INTEGER DEFAULT 0, products TEXT)"
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS products (name TEXT NOT NULL UNIQUE, barcode NUMBER NOT NULL UNIQUE, stock INTEGER NOT NULL, alert INTEGER NOT NULL, price INTEGER NOT NULL, image BLOB, profit NUMBER DEFAULT 0)"
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS transactions (deal_number TEXT NOT NULL, products_list BLOB NOT NULL, total INTEGER NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL, user TEXT NOT NULL, profit NUMBER DEFAULT 0)"
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS users (username TEXT NOT NULL UNIQUE , password TEXT NOT NULL, SELL INTEGER DEFAULT 1, CHANGE_ADMIN_PASSWORD INTEGER DEFAULT 0, GRANT_PRIVILEGES INTEGER DEFAULT 0 , ACCESS_INVENTORY INTEGER DEFAULT 0, ADD_PRODUCTS INTEGER DEFAULT 0, DELETE_PRODUCTS INTEGER DEFAULT 0, MODIFY_PRODUCTS INTEGER DEFAULT 0, IMPORT_PRODUCTS INTEGER DEFAULT 0, PRINT_INVENTORY INTEGER DEFAULT 0, ACCESS_CLIENTS INTEGER DEFAULT 0, ADD_CLIENTS INTEGER DEFAULT 0, MODIFY_CLIENTS INTEGER DEFAULT 0, DELETE_CLIENTS INTEGER DEFAULT 0, CREDIT_CLIENTS INTEGER DEFAULT 0, PRINT_CLIENTS_LIST INTEGER DEFAULT 0, ACCESS_SETTINGS INTEGER DEFAULT 0, ADD_USERS INTEGER DEFAULT 0, DELETE_USERS INTEGER DEFAULT 0, MODIFY_USERS INTEGER DEFAULT 0, ACCESS_PARAMETERS INTEGER DEFAULT 0, ACCESS_TRANSACTIONS INTEGER DEFAULT 0)"
  );

  const stmt = db.prepare(
    "INSERT INTO users VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
  );

  stmt.run(
    "Admin",
    "Admin",
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  );
};

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "development";

let mainWindow;

const createMainWindow = async () => {
  if (!store.has("firstRun")) {
    store.set("firstRun", true);
    store.set("deal_number", 1);
    store.set("language", "fr");
    store.set("theme", "blue_theme");
    initSQLite();
  }

  /*

  if (!store.has('firstRun')) {
     
    // Only executes on the first run
    
    // Set the flag to true  

    store.set('firstRun', true);
    store.set('id', nodeMachineID.machineIdSync())
    store.set('deal_number', 1)

    db.exec('CREATE TABLE IF NOT EXISTS machine (id TEXT NOT NULL UNIQUE)')
    const stmt = db.prepare('INSERT INTO machine values(?)')
    stmt.run(nodeMachineID.machineIdSync())


  
  }else{

    console.log(getMachineId())


    if(store.get('id') === nodeMachineID.machineIdSync() && getMachineId() === nodeMachineID.machineIdSync()){
      console.log('Authorized machine')
    }else{
      app.quit()
    }
  }



  
*/

  setInterval(() => {
    checkInternetConnected(checkInternetConnectedConfig)
      .then(async () => {
        console.log("Connection available");

        internetConnection = true;

        //Connect to MongoDB Atlas
        await mongoose.connect(mongoDB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      })
      .catch((err) => {
        console.log("No connection", err);
        internetConnection = false;
      });
  }, 15000);

  mainWindow = new BrowserWindow({
    title: "Soft POS",
    transparent: true,
    width: 400,
    height: 450,
    fullscreenable: true,
    frame: false,
    resizable: true,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // or true if using preload script
      preload: path.join(__dirname, "/preload.js"),
    },
  });

  if (isDev) {
    //mainWindow.webContents.openDevTools()
  }

  //mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));

  /*
mainWindow.loadURL(url.format({
  pathname: path.join(__dirname, "./build/index.html"), // relative path to the HTML-file
  protocol: "file:",
  slashes: true
}));


*/

  mainWindow.loadURL(`file://${path.join(__dirname, "./build/index.html")}`);
};

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });

  ipcMain.on("command", (event, args) => {
    switch (args.type) {
      case "exit":
        app.quit();
        break;

      case "resize":
        // Resizing
        mainWindow.setSize(args.payload.width, args.payload.height);

        // Calculating the center coords
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;
        const centerX = Math.floor((width - mainWindow.getSize()[0]) / 2);
        const centerY = Math.floor((height - mainWindow.getSize()[1]) / 2);

        // Set the window's position to the center
        mainWindow.setPosition(centerX, centerY);

        break;

      case "fullscreen":
        mainWindow.maximize();
        break;

      default:
        return;
    }
  });

  ipcMain.handle("login", async (event, args) => {
    const { user, password } = args;

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const stmt = db.prepare(sql);
    const rows = stmt.all(user, password);

    if (rows.length > 0) {
      return {
        msg: "Validation success",
        redirect: "/home/selling/",
        user: rows[0].username,
        deal_number: store.get("deal_number"),
      };
    } else {
      return { text: "Validation failed!", color: "#EB5353" };
    }
  });

  ipcMain.handle("filter_product", async (event, args) => {
    const sql = `SELECT * FROM products WHERE stock > 0 AND (name LIKE '%' || ? || '%' OR barcode LIKE '%' || ? || '%')`;
    const stmt = db.prepare(sql);
    const rows = stmt.all(args, args);

    if (rows.length > 0) {
      return rows;
    } else {
      return { text: "Product doesn't exist in DB!", color: "#EB5353" };
    }
  });

  ipcMain.handle("all_products", async (event) => {
    const sql = `SELECT * FROM products`;
    const stmt = db.prepare(sql);
    const rows = stmt.all();

    if (rows.length > 0) {
      return rows;
    } else {
      return { text: "DB is empty!" };
    }
  });

  ipcMain.handle("all_clients", async (event) => {
    const sql = `SELECT * FROM clients`;
    const stmt = db.prepare(sql);
    const rows = stmt.all();

    if (rows.length > 0) {
      return rows;
    } else {
      return { text: "DB is empty!" };
    }
  });

  ipcMain.handle("add_client", async (event, args) => {
    return new Promise(async (resolve, reject) => {
      if (Array.isArray(args)) {
        const stmt = db.prepare(
          "INSERT INTO clients VALUES (?, ?, ?, ?, ?, ?)"
        );
        const values = args.map(
          ({
            name,
            phone,
            debt,
            transactions_all_time,
            transactions_last_month,
            products,
          }) => [
            name,
            phone,
            debt,
            transactions_all_time,
            transactions_last_month,
            products,
          ]
        );
        const result = stmt.run(values);

        if (result.changes > 0) {
          /*
            if(internetConnection){

              const clients = args.map(({ name, phone, debt, transactions_all_time, transactions_last_month, products }) => ({
                name,
                phone,
                debt,
                transactions_all_time,
                transactions_last_month,
                
              }))
    
              await ClientModel.insertMany(clients, (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({ text: `${args.length} clients have been added to the database!` });
                }
              });

              

            }else{
              console.log('No internet, client can not be saved to cloud')
            }

            */
        } else {
          reject(new Error("Failed to add clients to the database."));
        }
      } else {
        const {
          name,
          phone,
          debt,
          transactions_all_time,
          transactions_last_month,
          products,
        } = args;
        const stmt = db.prepare(
          "INSERT INTO clients VALUES (?, ?, ?, ?, ?, ?)"
        );
        try {
          let result;
          if (products) {
            result = stmt.run(
              name,
              phone,
              debt,
              transactions_all_time,
              transactions_last_month,
              products
            );
          } else {
            result = stmt.run(
              name,
              phone,
              debt,
              transactions_all_time,
              transactions_last_month,
              ""
            );
          }

          if (result.changes > 0) {
            /*
              if(internetConnection){
  
                const debtN = Number(debt)
                const transactions_all_timeN = Number(transactions_all_time)
                const transactions_last_monthN = Number(transactions_last_month)
                const client = new ClientModel({
                  name,
                  phone,
                  transactions_all_time : transactions_all_timeN,
                  transactions_last_month : transactions_last_monthN,
                  debt : debtN
                })
      
                await client.save();
  
              }else{
                console.log('No internet')
              }
              */

            resolve({ text: `Client have been added to the database!` });
          } else {
            reject({ text: "Client cannot be added" });
          }
        } catch (error) {
          resolve({
            text: "Client cannot be added",
            errorType: "Duplicate",
          });
        }
      }
    });
  });

  ipcMain.handle("filter_client", async (event, args) => {
    const sql = `SELECT * FROM clients WHERE name LIKE '%' || $name || '%'`;
    const stmt = db.prepare(sql);
    const rows = stmt.all({ name: args });

    return new Promise((resolve, reject) => {
      if (rows.length > 0) {
        resolve(rows);
      } else {
        resolve({ text: "Client doesn't exist in DB!", color: "#EB5353" });
      }
    });
  });

  ipcMain.handle("edit_client", async (event, args) => {
    const {
      name,
      phone,
      debt,
      transactions_all_time,
      transactions_last_month,
      products,
    } = args;

    const sqlFetchClient = "SELECT * FROM CLIENTS WHERE name = ?";
    const stmtClient = db.prepare(sqlFetchClient);
    const resultClient = stmtClient.all(name);

    if (resultClient[0]) {
      let result;
      const sql = `UPDATE clients SET name = $name, phone = $phone, products = $products , debt = $debt, transactions_all_time = $transactions_all_time, transactions_last_month = $transactions_last_month WHERE name = $name`;
      const stmt = db.prepare(sql);

      if (resultClient[0].products.length > 0) {
        const parsed = JSON.parse(resultClient[0].products);

        parsed.push(...products);

        console.log(parsed);

        result = stmt.run({
          name,
          phone,
          debt,
          transactions_all_time,
          transactions_last_month,
          products: JSON.stringify(parsed),
        });
      } else {
        result = stmt.run({
          name,
          phone,
          debt,
          transactions_all_time,
          transactions_last_month,
          products: JSON.stringify(products),
        });
      }

      return new Promise(async (resolve, reject) => {
        if (result.changes > 0) {
          /*
  
          if(internetConnection){
  
            await ClientModel.findOneAndUpdate(
              { name },
              { $set: { debt, transactions_all_time, transactions_last_month } },
              { new: true }
            )
  
          }else{
            console.log('No internet')
          }

          */

          resolve({ text: `Client ${name} updated!` });
        } else {
          reject(new Error("Failed to update client!"));
        }
      });
    }
  });

  ipcMain.handle("delete_client", async (event, args) => {
    if (args === "ALL") {
      const stmt = db.prepare("DELETE FROM clients");
      const result = stmt.run();

      return new Promise(async (resolve, reject) => {
        if (result.changes > 0) {
          /*
          if(internetConnection){
            
            await ClientModel.deleteMany({})

          }else{
            console.log('No internet')
          }


          */

          resolve({ text: "All clients deleted!" });
        } else {
          reject(new Error("Failed to delete clients!"));
        }
      });
    } else {
      if (args.length > 1) {
        const promises = args.map((client) => {
          const stmt = db.prepare("DELETE FROM clients WHERE name = $name");
          const result = stmt.run({ name: client.name });

          return new Promise((resolve, reject) => {
            if (result.changes > 0) {
              resolve({ text: `${args.length} clients have been deleted!` });
            } else {
              reject(new Error(`Failed to delete client ${client.name}!`));
            }
          });
        });

        return Promise.all(promises);
      } else {
        const stmt = db.prepare("DELETE FROM clients WHERE name = $name");
        const result = stmt.run({ name: args[0].name });

        return new Promise(async (resolve, reject) => {
          if (result.changes > 0) {
            /*

            if(internetConnection){
              
              await ClientModel.findOneAndDelete({name : args[0].name})

            }else{
              console.log('No internet')
            }

            */

            resolve({ text: `Client ${args[0].name} has been deleted!` });
          } else {
            reject(new Error(`Failed to delete client ${args[0].name}!`));
          }
        });
      }
    }
  });

  ipcMain.handle("remove_debt", (event, args) => {
    const { products, client } = args;
    let totalDebt = 0;

    products.forEach((prod) => {
      totalDebt += prod.quantity * prod.price;
    });

    sql = `UPDATE clients SET products = ?, debt = ? WHERE name = ?`;
    stmt = db.prepare(sql);
    result = stmt.run(JSON.stringify(products), totalDebt, client);

    if (result.changes > 0) {
      return {
        text: `Product removed`,
      };
    }
  });

  ipcMain.handle("delete_product", async (event, args) => {
    if (args === "ALL") {
      const sql = `DELETE FROM products`;
      db.exec(sql);

      /*

      if(internetConnection){
          // Delete all products in the collection
          await ProductModel.deleteMany({})
      }else{
        console.log('No internet')
      }
      */

      return { text: "All products deleted!" };
    } else {
      if (args.length > 0) {
        try {
          const stmt = db.prepare("DELETE FROM products WHERE barcode = ?");
          const promises = args.map((prod) => {
            const { barcode } = prod;

            return stmt.run(barcode);
          });

          await Promise.all(promises);

          return {
            text: `${args.length} product have been deleted`,
          };
        } catch (error) {
          return {
            text: `Error deleting products`,
          };
        }
      } else {
        return { text: "Invalid arguments!" };
      }
    }
  });

  ipcMain.handle("print_inventory", async (event, args) => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    const table = [
      ["Nom", "Code Barre", "Stock", "Alerte", "Prix", "Bénéfice"],
      ...args.map((entry) => [
        entry.name,
        entry.barcode.toString(),
        entry.stock.toString(),
        entry.alert.toString(),
        entry.price.toString(),
        entry.profit.toString(),
      ]),
    ];

    const columnWidths = [180, 100, 80, 80, 80, 80];
    const rowHeight = 20;
    const textMargin = 5;

    let y = page.getHeight() + 20;

    for (const row of table) {
      if (y - rowHeight - 13 < 0) {
        page = pdfDoc.addPage();
        y = page.getHeight() + 20;
      }

      let x = 0;
      for (let i = 0; i < row.length; i++) {
        const cellText = row[i];
        const width = columnWidths[i];
        page.drawText(cellText, {
          x: x + textMargin,
          y: y - rowHeight - 13,
          size: 12,
          color: rgb(0, 0, 0),
        });
        x += width;
      }

      y -= rowHeight;

      // Draw horizontal line
      page.drawLine({
        start: { x: 0, y: y },
        end: { x: page.getWidth(), y: y },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    }

    // Draw vertical lines
    let x = 0;
    for (const width of columnWidths) {
      page.drawLine({
        start: { x: x, y: page.getHeight() },
        end: { x: x, y: page.getHeight() - 50 - args.length * rowHeight },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      x += width;
    }

    const pdfBytes = await pdfDoc.save();

    // Save the PDF to Desktop
    const desktopPath = path.join(os.homedir(), "Desktop", "Stock.pdf");

    fs.writeFileSync(desktopPath, pdfBytes);

    return {
      text: "PDF generated successfully!",
    };
  });

  ipcMain.handle("add_product", async (event, args) => {
    if (args.length > 0) {
      let p;
      try {
        const stmt = db.prepare(
          "INSERT INTO products (name, barcode, stock, price, profit, alert, image) VALUES (?, ?, ?, ?, ?, ?, ?)"
        );

        const promises = args.map((prod) => {
          const { name, barcode, stock, price, buy_price, alert } = prod;

          p = name;

          if (name && barcode && stock && price && buy_price && alert) {
            const profit = price - buy_price;
            return stmt.run(name, barcode, stock, price, profit, alert, "");
          }
        });

        await Promise.all(promises);

        return {
          text: "Products imported",
        };
      } catch (error) {
        return {
          text: `Product ${p} is duplicated`,
        };
      }
    } else {
      try {
        const { name, barcode, stock, price, profit, alert, image } = args;
        const sql = `INSERT INTO products (name, barcode, stock, price, profit, alert, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const stmt = db.prepare(sql);
        const result = stmt.run(
          name,
          barcode,
          stock,
          price,
          profit,
          alert,
          image
        );

        if (result.changes > 0) {
          /*

            if(internetConnection){

              //Create a new product document
              const newProduct = new ProductModel({ name, barcode, stock, price, profit, alert, image })

              // 4. Save the new user document
              await newProduct.save()

            }else{
              console.log('No internet')
            }

            */

          return { text: "Product added successfully!" };
        }
      } catch (error) {
        return {
          text: "You are trying to add a dupliacte product, make sure the name and barcode are unique",
        };
      }
    }
  });

  ipcMain.handle("update_product", async (event, args) => {
    const { name, barcode, stock, price, buy_price, alert, image } = args;
    let sql, result, stmt;

    const profit = price - buy_price;

    if (image) {
      sql = `UPDATE products SET name = ?, stock = ?, price = ?, profit = ?, alert = ?, image = ? WHERE barcode = ?`;
      stmt = db.prepare(sql);
      result = stmt.run(name, stock, price, profit, alert, image, barcode);
    } else {
      sql = `UPDATE products SET name = ?, stock = ?, price = ?, profit = ?, alert = ? WHERE barcode = ?`;
      stmt = db.prepare(sql);
      result = stmt.run(name, stock, price, profit, alert, barcode);
    }

    if (result.changes > 0) {
      /*
      if(internetConnection){
        //Update the product in MongoDB
        await ProductModel.findOneAndUpdate(
          { barcode },
          { $set: { name, stock, price, buy_price, alert } },
          { new: true }
        )
      }else{
        console.log('No internet')
      }

      */

      return { text: "Product updated successfully!" };
    } else {
      return { text: "Failed to update product!" };
    }
  });

  // USERS
  ipcMain.handle("all_users", async (event) => {
    const sql = `SELECT * FROM users`;
    const stmt = db.prepare(sql);
    const rows = stmt.all();

    if (rows.length > 0) {
      return rows;
    } else {
      return { text: "DB is empty!" };
    }
  });

  ipcMain.handle("update_user", async (event, args) => {
    const { oldUser_username, newUser } = args;
    const { password, username } = newUser;
    const sql = `UPDATE users SET password = ?, username = ? WHERE  username = '${oldUser_username}'`;
    const stmt = db.prepare(sql);
    const result = stmt.run(password, username);
    console.log(result);

    if (result.changes > 0) {
      /*
      if(internetConnection){

        //Update the user in MongoDB
        const updatedUser = await UserModel.findOneAndUpdate(
          { username: oldUser_username },
          { $set: { password, username } },
          { new: true }
        )

      }else{
        console.log('No internet')
      }

      */

      return { text: "User updated successfully!" };
    } else {
      return { text: "Failed to update user!" };
    }
  });

  ipcMain.handle("create_user", async (event, args) => {
    const { username, password } = args;

    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    const stmt = db.prepare(sql);
    const result = stmt.run(username, password);

    if (result.changes > 0) {
      /*
        try {

          
    
          if(internetConnection){
            //Create a new user document
            const newUser = new UserModel({ username, password })
    
        
    
            //Save the new user document
            await newUser.save()
          }else{
            console.log('No internet, user will not be saved to cloud')
          }

          
    
           
          
    
      } catch (error) {
        console.error('Error adding user to MongoDB:', error)
      }

      */

      return { text: "User added successfully!" };
    } else {
      return { text: "Failed to add user!" };
    }
  });

  ipcMain.handle("delete_user", async (event, args) => {
    const username = args;

    const sql = `DELETE FROM users WHERE username = ?`;
    const stmt = db.prepare(sql);
    const result = stmt.run(username);

    if (result.changes > 0) {
      /*
              try {

                

                if(internetConnection){
                  //Delete the user from MongoDB
                  const result = await UserModel.deleteOne({ username });
          
                }else{
                  console.log('No internet')
                }

                
          
                
          
              
          
                
                 
                
          
            } catch (error) {
              console.error('Error adding user to MongoDB:', error)
            }
            */

      return { text: "User deleted successfully!" };
    } else {
      return { text: "Something went wrong!" };
    }
  });

  ipcMain.handle("update_admin_password", async (event, args) => {
    const { password } = args;
    const sql = `UPDATE users SET password = ? WHERE  username = 'Admin'`;
    const stmt = db.prepare(sql);
    const result = stmt.run(password);

    if (result.changes > 0) {
      return { text: "Password updated successfully!" };
    } else {
      return { text: "Failed to update password!" };
    }
  });

  ipcMain.handle("update_privilege", async (event, args) => {
    const { privilege, user, value } = args;

    let val;

    if (value === "on") {
      val = 1;
    } else {
      val = 0;
    }

    const sql = `UPDATE users SET ${privilege} = ? WHERE username = ?`;
    const stmt = db.prepare(sql);
    const result = stmt.run(val, user);

    if (result.changes > 0) {
      /*
      if(internetConnection){

          //Update the privilege in MongoDB
          const updatedUser = await UserModel.findOneAndUpdate(
            { username : user },
            { $set: { [privilege]: value === 'on' } },
            { new: true }
          )

      }else{
        console.log('No internet')
      }

      */
    }
  });

  const checkPrivilege = (username, privilege) => {
    const stmt = db.prepare(
      `SELECT ${privilege} FROM users WHERE username = ?`
    );
    const row = stmt.get(username);
    // If the row is found and the privilege value is 1, the privilege is granted
    const granted = row && row[privilege] === 1;
    return granted;
  };

  ipcMain.handle("check_privilege", async (event, args) => {
    const { username, privilege } = args;
    try {
      const granted = checkPrivilege(username, privilege);
      return { granted };
    } catch (error) {
      return { error: "Failed to check privilege" };
    }
  });

  ipcMain.handle("get_transaction_number", async (event) => {
    const deal_number = await store.get("deal_number");
    return deal_number;
  });

  ipcMain.handle("delete_transaction", async (event, args) => {
    const { transactions } = args;

    if (args.DELETE_ALL) {
      db.exec("DELETE FROM transactions");

      return {
        text: "All transactions deleted",
      };
    } else {
      transactions.forEach((transaction) => {
        db.exec(
          `DELETE FROM transactions WHERE deal_number = ${transaction.deal_number}`
        );
      });

      return {
        text: `${transactions.length} transaction have been deleted`,
      };
    }
  });

  ipcMain.handle("process_transaction", async (event, args) => {
    const { products_list, user, total } = args;

    try {
      const updateStmt = db.prepare(
        "UPDATE products SET stock = ? WHERE barcode = ?"
      );
      const promises = products_list.map((prod) => {
        const { barcode, stock } = prod;
        return updateStmt.run(stock, barcode);
      });

      await Promise.all(promises);

      const filteredProductsList = products_list.map((prod) => {
        const { image, stock, alert, ...filteredProd } = prod;
        return filteredProd;
      });

      let transactionProfit = 0;
      filteredProductsList.forEach(
        (prod) => (transactionProfit += prod.profit * prod.quantity)
      );

      const currentDate = new Date();

      // Get the current date in YYYY-MM-DD format
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      // Get the current time in HH:MM:SS format
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      const insertStmt = db.prepare(
        "INSERT INTO transactions VALUES(?,?,?,?,?,?,?)"
      );

      const result = insertStmt.run(
        store.get("deal_number"),
        JSON.stringify(filteredProductsList),
        total,
        formattedDate,
        formattedTime,
        user,
        transactionProfit
      );

      if (result.changes > 0) {
        /*
  
        if(internetConnection){
  
          const transaction = new TransactionModel({
            deal_number : store.get('deal_number'),
            products_list : filteredProductsList,
            total,
            date : formattedDate,
            time : formattedTime,
            user
          })
  
          await transaction.save()
  
  
        }
        */
      } else {
        console.log("not saved");
      }

      store.set("deal_number", store.get("deal_number") + 1);

      /*
        if(internetConnection){
          // Sync changes to MongoDB
          await syncChangesToMongoDB(products_list);
        }else{
          console.log('No internet')
        }
      
        */

      return {
        text: "Validated",
        deal_number: store.get("deal_number"),
      };
    } catch (error) {
      throw new Error("Failed to process transaction");
    }
  });

  ipcMain.handle("validate_deal", async (event, args) => {
    try {
      const stmt = db.prepare(
        "UPDATE products SET stock = ? WHERE barcode = ?"
      );
      const promises = args.map((prod) => {
        const { barcode, stock } = prod;
        return stmt.run(stock, barcode);
      });

      await Promise.all(promises);

      store.set("deal_number", store.get("deal_number") + 1);

      /*
      if(internetConnection){
        // Sync changes to MongoDB
        await syncChangesToMongoDB(args);
      }else{
        console.log('No internet')
      }
      */

      return {
        text: "Validated",
        deal_number: store.get("deal_number"),
      };
    } catch (err) {
      throw new Error("Failed to validate deal");
    }
  });

  ipcMain.handle("save_transaction_details", async (event, args) => {
    const { user, products_list, total, deal_number } = args;

    const currentDate = new Date();

    // Get the current date in YYYY-MM-DD format
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Get the current time in HH:MM:SS format
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const stmt = db.prepare("INSERT INTO transactions VALUES(?,?,?,?,?,?)");

    const result = stmt.run(
      deal_number,
      JSON.stringify(products_list),
      total,
      formattedDate,
      formattedTime,
      user
    );

    if (result.changes > 0) {
      console.log("saved");

      /*
      if(internetConnection){

        const transaction = new TransactionModel({
          deal_number,
          products_list,
          total,
          date : formattedDate,
          time : formattedTime,
          user
        })

        await transaction.save()


      }

      */
    } else {
      console.log("not saved");
    }
  });

  async function syncChangesToMongoDB(products) {
    try {
      // Sync each product's stock to MongoDB
      const promises = products.map((prod) => {
        const { barcode, stock } = prod;
        return ProductModel.findOneAndUpdate({ barcode }, { stock });
      });

      await Promise.all(promises);
    } catch (err) {
      console.error("Failed to sync changes to MongoDB:", err);
    }
  }

  ipcMain.handle("all_transactions", async (event, args) => {
    const stmt = db.prepare("SELECT * FROM transactions");
    const result = stmt.all();

    if (result.length > 0) {
      return result;
    } else {
      return { text: "DB is empty!" };
    }
  });

  // Other handlers

  ipcMain.handle("check_internet", (event, args) => {
    return internetConnection;
  });

  ipcMain.handle("send_message", async (event, args) => {
    try {
      const message = new MessageModel(args);

      await message.save();

      return {
        received: true,
      };
    } catch (error) {
      console.log(error);
    }
  });

  ipcMain.handle("change_language", (event, args) => {
    store.set("language", args);
  });

  ipcMain.handle("get_language", (event) => {
    return store.get("language");
  });

  ipcMain.handle("change_theme", (event, args) => {
    store.set("theme", args);
  });

  ipcMain.handle("get_theme", (event) => {
    return store.get("theme");
  });

  app.on("window-all-closed", () => {
    if (!isMac) {
      app.quit();
    }
  });
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.allowRendererProcessReuse = true;
