const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableControllers');

router.get('/', (req, res) => res.render('index.ejs'));
// Routes for table operations
router.post('/', tableController.createTable);        
router.get('/', tableController.getAllTables);         

// Place dynamic `:id` routes after specific routes
router.get('/:id', tableController.getTableById);      
router.put('/:id', tableController.updateTable);       
router.delete('/:id', tableController.deleteTable);    

module.exports = router;
