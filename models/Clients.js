const mongoose = require('mongoose')


// Define the client schema and model
const clientSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true,
        unique : true
    },

    phone : {
        type : String,
        required : true,
        unique : true
    },

    debt : {
        type : Number,
        default : 0
    },

    transactions_all_time : {
        type : Number,
        default : 0
    },

    transactions_last_month : {
        type : Number,
        default : 0
    }

  })
  


const ClientModel = mongoose.model('Client', clientSchema)

module.exports = ClientModel
