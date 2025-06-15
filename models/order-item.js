const mongoose = require('mongoose');
const orderitemdb = mongoose.createConnection("mongodb+srv://youssef2205641:iOwkHeXdqJSXCRrg@cluster0.hrelt99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const OrderItem = orderitemdb.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
