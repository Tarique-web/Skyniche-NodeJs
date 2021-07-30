const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionsController");
router.post('/',transactionController.createTransactionsByJSONfile);
router.get('/transactionDetails',transactionController.FindData);
router.get('/allTotalPayment',transactionController.paymentTotalAllRecords);
router.get('/totalPrice',transactionController.TotalPrice);
router.get('/allTotalPaymentRecords',transactionController.allTotalPayment);
router.get('/maxId',transactionController.maxId);
router.get('/maxPrice',transactionController.maxPrice);
router.post('/createTransaction',transactionController.createTransaction);
router.put('/updateTransaction/:Id',transactionController.updateTransaction);
router.delete('/deleteTransaction/:Id',transactionController.deleteTransaction);
router.get('/transactionGet',transactionController.TransactionGet);


module.exports = router;