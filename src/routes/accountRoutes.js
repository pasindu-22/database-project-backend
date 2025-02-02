const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAllAccounts);
router.post('/', accountController.createAccount);
router.get('/customer/:customer', accountController.getByCustomer);
router.get('/:id', accountController.getAccountById);
router.post('/withdraw/:accountId', accountController.withdrawFromAccount);

module.exports = router;