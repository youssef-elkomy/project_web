const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static('public'));


// Routes
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orders');
const tableRoutes = require('./routes/table'); 
const indexroutes=require('./routes/index')

// Routing middleware
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes); 
app.use('/', indexroutes); 


// Error Handler
const errorHandler = require('./helpers/error-handler');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
mongoose.connect("mongodb+srv://youssef2205641:iOwkHeXdqJSXCRrg@cluster0.hrelt99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('Mongo Connected!');
  })
  .catch(() => {
    console.log('Mongo connection failed');
  });