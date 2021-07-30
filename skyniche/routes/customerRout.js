const express = require("express");
const router = express.Router();
const customerController = require("../controller/customersController");
router.post('/',customerController.createCustomers);



module.exports = router;