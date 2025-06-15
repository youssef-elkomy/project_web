const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', (req, res) => res.render('index.ejs'));
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.get('/get/totalsales', orderController.getTotalSales);
router.get('/get/count', orderController.getOrderCount);
router.get('/get/userorders/:userid', orderController.getUserOrders);

module.exports = router;
