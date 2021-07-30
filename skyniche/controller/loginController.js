const customerModel = require('../model/customersModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {

    /**
      * Request Validation
      */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "loginController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }
    if (!req.body.password || req.body.password == "") {
        return res.status(400).send({
            message: "password can not be empty",
            status: 400
        });
    }

    const user = await customerModel.findOne({ email: req.body.email })
    const secret = process.env.secret;
    if (!user) {
        return res.status(404).send({
            status: 404,
            message: "The user not found"
        });
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                email: user.email,
                isAdmin: user.isAdmin
            },
            secret,
            { expiresIn: '1d' }
        )
        res.cookie(token);
        res.status(200).send({
            status: 200,
            message: 'login success!',
            user: user.name, email: user.email, token: token
        })
    } else {
        res.status(400).send({
            status: 400,
            message: 'password is wrong!'
        });
    }

}