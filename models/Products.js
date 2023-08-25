const mongoose = require('mongoose')

const requiredNumberType = {
    type : Number,
    required : true
}

// Define the product schema and model
const productSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique : true
    },
    barcode: {
        type : String,
        required : true,
        unique : true
    },
    stock : requiredNumberType,
    alert : requiredNumberType,
    price : requiredNumberType,
    buy_price : requiredNumberType,
    last_month_n_sales : Number,
    profit_per_unit : Number
    

  })
  


const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel
