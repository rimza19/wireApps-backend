const express = require('express');
const router = express.Router();
const managerController = require('../controllers/ownerController')

// Routes for medication records
router.get('/medications', managerController.getAllMedications);
router.put('/medications/:id', managerController.updateMedication);

// Routes for customer records
router.get('/customers', managerController.getAllCustomers);
router.put('/customers/:id', managerController.updateCustomer);


module.exports = router;