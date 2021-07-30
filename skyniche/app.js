const express = require('express')
const app = express();
const db = require("./config/db")
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
require('dotenv/config')
const bodyParser = require("body-parser");

const router = express.Router();

// middleware
app.use(bodyParser.json());
app.use(authJwt());
app.use(errorHandler);


app.use('/', router);
// Base URL
app.use('/customers', require('./routes/customerRout'));
app.use('/transactions', require('./routes/transactionRout'));
app.use('/login', require('./routes/loginRout'));



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running port http://localhost:${PORT}`);
})