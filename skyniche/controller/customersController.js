const customerModel = require('../model/customersModel')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
exports.createCustomers = async (req, res) => {


    /**
      * Request Validation
      */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    if (!req.body.firstName || req.body.firstName == "") {
        return res.status(400).send({
            message: "The Customer firstName  can not be empty",
            status: 400
        });
    }
    if (!req.body.lastName || req.body.lastName == "") {
        return res.status(400).send({
            message: "The Customer lastName  can not be empty",
            status: 400
        });
    }

    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }
    if (!req.body.phone || req.body.phone == "") {
        return res.status(400).send({
            message: "The Customer phone can not be empty",
            status: 400
        });
    }
    if (!req.body.password || req.body.password == "") {
        return res.status(400).send({
            message: "password can not be empty",
            status: 400
        });
    }
    if (!req.body.BusinessType || req.body.BusinessType == "") {
        return res.status(400).send({
            message: "The Customer BusinessType  can not be empty",
            status: 400
        });
    }
    if (!req.body.Company || req.body.Company == "") {
        return res.status(400).send({
            message: "The Customer Company  can not be empty",
            status: 400
        });
    }


    const passwordHash = await bcrypt.hashSync(req.body.password, 10); //hashing password

    let customers = new customerModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        BusinessType: req.body.BusinessType,
        Reference: req.body.Reference,
        Company: req.body.Company,
        passwordHash: passwordHash,
        isAdmin: req.body.isAdmin
    })

    //checking customer is exist or not
    customerModel.findOne({ $or: [{ "email": req.body.email }, { "mobile": req.body.phone }] })
        .then((data) => {
            if (data) {
                res.send({
                    message: 'The customer is exist',
                    status: 200
                });

            } else {
                // creating new customer
                customers.save().then((results) => {
                    res.status(200).send({
                        status: 200,
                        message: "The customers is created !",
                        data: results

                    })
                }).catch((err) => {
                    res.status(500).send({
                        status: 500,
                        error: err
                    })
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err || "Some error occurred while finding customer.",
                status: 500
            });
        })


}