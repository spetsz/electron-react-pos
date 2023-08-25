const mongoose = require('mongoose')

const privilegeType = {
    type : Number,
    default : 0
}


// Define the user schema and model
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    sell : {
        type : Number,
        default : 1
    },
    CHANGE_ADMIN_PASSWORD : privilegeType,
    GRANT_PRIVILEGES : privilegeType,
    ACCESS_INVENTORY : privilegeType,
    ADD_PRODUCTS : privilegeType,
    DELETE_PRODUCTS : privilegeType,
    MODIFY_PRODUCTS : privilegeType,
    IMPORT_PRODUCTS : privilegeType,
    PRINT_INVENTORY : privilegeType,
    ACCESS_CLIENTS : privilegeType,
    ADD_CLIENTS : privilegeType,
    DELETE_CLIENTS : privilegeType,
    MODIFY_CLIENTS : privilegeType,
    CREDIT_CLIENTS : privilegeType,
    PRINT_CLIENTS_LIST : privilegeType,
    ACCESS_SETTINGS : privilegeType,
    ADD_USERS : privilegeType,
    DELETE_USERS : privilegeType,
    MODIFY_USERS : privilegeType,
    ACCESS_PARAMETERS : privilegeType,
    ACCESS_TRANSACTIONS : privilegeType
   


  })
  


const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
