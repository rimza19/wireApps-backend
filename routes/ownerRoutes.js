const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController')

// Routes for medication records

router.post('/medications', ownerController.insertMedication);
router.put('/medications/:id', ownerController.updateMedication);
router.delete('/medications/:id', ownerController.deleteMedication);
router.delete('/medications/soft/:id', ownerController.softDeleteMedication);

// Routes for customer records

router.post('/customers', ownerController.insertCustomer);
router.put('/customers/:id', ownerController.updateCustomer);
router.delete('/customers/:id', ownerController.deleteCustomer);
router.delete('/customers/soft/:id', ownerController.softDeleteCustomer);

module.exports = router;