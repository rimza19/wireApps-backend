const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController')
const {jwtMiddleware,checkRole} = require('../middleware/jwtAuth')

// Routes for medication records
router.get('/medications', ownerController.getAllMedications);
router.post('/medications',jwtMiddleware, checkRole(['owner']), ownerController.insertMedication);
router.put('/medications/:id',jwtMiddleware, checkRole(['owner','manager','cashier']), ownerController.updateMedication);
router.delete('/medications/:id',jwtMiddleware, checkRole(['owner']), ownerController.deleteMedication);
router.put('/medications/soft/:id',jwtMiddleware, checkRole(['owner','manager']), ownerController.softDeleteMedication);

// Routes for customer records
router.get('/customers',  ownerController.getAllCustomers);
router.post('/customers', jwtMiddleware, checkRole(['owner']), ownerController.insertCustomer);
router.put('/customers/:id', jwtMiddleware, checkRole(['owner','manager','cashier']),ownerController.updateCustomer);
router.delete('/customers/:id', jwtMiddleware, checkRole(['owner']),ownerController.deleteCustomer);
router.put('/customers/soft/:id', jwtMiddleware, checkRole(['owner','manager']),ownerController.softDeleteCustomer);

module.exports = router;