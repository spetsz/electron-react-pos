const mongoose = require('mongoose')


// Define the message schema and model
const messageSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    
    date: {
        type : Date,
        required : true,
        default : Date.now
    },

    phone: {
        type : String,
        required : true
    },

    email: {
        type : String   
    },

    message : {
        type : String,
        required : true
    }
   
   
    

  })
  


const MessageModel = mongoose.model('Message', messageSchema)

module.exports = MessageModel
