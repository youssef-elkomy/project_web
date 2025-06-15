const mongoose = require('mongoose');
const tabledb = mongoose.createConnection("mongodb+srv://youssef2205641:iOwkHeXdqJSXCRrg@cluster0.hrelt99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const reservationSchema = new mongoose.Schema({
  tableId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 },
  userName: {
    type: String,
    required: true
  }
});

const table = tabledb.model('Reservation', reservationSchema);
module.exports = table;