const mongoose = require('mongoose')


// Define the transaction schema and model
const transactionSchema = new mongoose.Schema({

    deal_number : {
        type : Number,
        required : true
    },
    
    date: {
        type : Date,
        required : true,
        default : Date.now
    },
    time: {
        type : String,
        required : true
    },
    products_list : {
        type : Array,
        required : true
    },
    total : {
        type : Number,
        required : true
    },
    user : {
        type : String,
        required : true
    }
   
    

  })
  


const TransactionModel = mongoose.model('Transaction', transactionSchema)

module.exports = TransactionModel
