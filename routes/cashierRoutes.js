const express = require('express');
const router = express.Router();
const cashierController = require('../controllers/ownerController')

// Routes for medication records
router.get('/medications', cashierController.getAllMedications);
router.put('/medications/:id', cashierController.updateMedication);
router.delete('/medications/soft/:id', cashierController.softDeleteMedication);

// Routes for customer records
router.get('/customers', cashierController.getAllCustomers);
router.put('/customers/:id', cashierController.updateCustomer);
router.delete('/customers/:id', cashierController.deleteCustomer);


module.exports = router;