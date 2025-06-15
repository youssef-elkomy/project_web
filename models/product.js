const mongoose = require('mongoose');
const productdb = mongoose.createConnection("mongodb+srv://youssef2205641:iOwkHeXdqJSXCRrg@cluster0.hrelt99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  }
});

productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true,
});


const Product = productdb.model('Product', productSchema);
module.exports = Product;