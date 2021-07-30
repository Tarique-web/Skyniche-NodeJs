const transactionsModel = require('../model/transactionsModel')
const TransactionJson = require('../transactions.json')

exports.createTransactionsByJSONfile = async (req, res) => {


    try {
        for await (i of TransactionJson) {

            let transactions = new transactionsModel({
                Id: i.Id,
                Name: i.Name,
                TransactionId: i.TransactionId,
                Subscriber: i.Subscriber,
                Note: i.Note,
                Transaction: i.Transaction,
                Payment: i.Payment

            })
            let saveTran = await transactions.save()
        }
        res.status(200).send({
            status: 200,
            message: "The transactions is created !",

        })

    } catch (err) {
        res.status(500).send({
            status: 500,
            error: err
        })
    }

    // transactions.save().then((results) => {
    //     res.status(200).send({
    //         status: 200,
    //         message: "The transactions is created !",
    //         data: results

    //     })
    // }).catch((err) => {
    //     res.status(500).send({
    //         status: 500,
    //         error: err
    //     })
    // })
}

// Find any record from transaction collection

exports.FindData = async (req, res) => {

    // #1. Find any record where Name is Tom
    let Name = req.query.name ? req.query.name : false;

    // # 3. Find a record in transactions collection where price is greater than 400
    let price = req.query.price
    // # 2. Find a record in transactions where total payment amount is 400.
    let totalPayment = req.query.totalPayment ? req.query.totalPayment : false;

    // #4 where Note is null or the key itself is missing.
    let note = req.query.note ? req.query.note : false;

    // #6. Note Null only
    let noteNull = { $type: 10 };
    let noteOnlyNull = req.query.noteNull ? noteNull : false;

    // #5 where the Note key does not exist.
    let noteExists = { $exists: false };
    let noteIsExist = req.query.noteExists ? noteExists : false;

    transactionsModel.find({
        $or: [
            { "Name": Name },
            { "Payment.Total": totalPayment },
            { "Transaction.price": { $gt: price } },
            { "Note": note },
            { "Note": noteOnlyNull },
            { "Note": noteIsExist }

        ]
    }).then((data) => {

        if (data.length != 0) {
            res.status(200).send({
                message: data,
                status: 200,
            })
        } else {

            res.send({
                message: 'Not Found !',
                status: 404
            });

        }

    }).catch((err) => {
        res.status(500).send({
            message: err,
            status: 500
        });
    })


}


// Aggregation with MongoDB
// 1. Calculate the total transaction amount by adding up Payment.Total in all records.

exports.paymentTotalAllRecords = async (req, res) => {

    transactionsModel.aggregate([
        {
            $group: {
                "_id": '',
                TotalRevenue: { $sum: '$Payment.Total' }
            }
        }
    ]).then((data) => {
        res.status(200).send({
            message: data,
            status: 200,
        })

    }).catch((err) => {
        res.status(500).send({
            message: err,
            status: 500
        });
    })
}

// # 2. Aggregate per record by aggregating Transaction.price

exports.TotalPrice = (req, res) => {
    transactionsModel.aggregate([
        {
            $project: {
                revenueTotal: { $sum: "$Transaction.price" },
            }
        }
    ]).then((data) => {
        res.status(200).send({
            status: 200,
            message: data,
           
        })

    }).catch((err) => {
        res.status(500).send({
            status: 500,
            error: err,
            
        });
    })


}

// 3. Calculate total payments (Payment.Total) for each payment type (Payment.Type).

exports.allTotalPayment = (req, res) => {
    transactionsModel.aggregate([
        {
            $group:
            {
                _id: "$Payment.Type",
                totalAmount: { $sum: "$Payment.Total" },
                count: { $sum: 1 }
            }
        }
    ]).then((data) => {
        res.status(200).send({
            status: 200,
            message: data
            
        })

    }).catch((err) => {
        res.status(500).send({
            status: 500,
            error: err
            
        });
    })


}
// 4. Find the max Id.
exports.maxId = (req, res) => {
    transactionsModel.aggregate([
        {
            $group:
            {
                _id: '',
                maxId: { $max: "$Id" }
            }
        }
    ]).then((data) => {
        res.status(200).send({
            status: 200,
            message: data
            
        })

    }).catch((err) => {
        res.status(500).send({
            status: 500,
            error: err
            
        });
    })

}

// 5. Find the max price (Transaction.price).

exports.maxPrice = (req, res) => {
    transactionsModel.aggregate([
        {
            $group:
            {
                _id: '',
                maxPrice: { $max: { $max: "$Transaction.price" } }
            }
        }
    ]).then((data) => {
        res.status(200).send({
            status: 200,
            message: data,
            
        })

    }).catch((err) => {
        res.status(500).send({
            status: 500,
            error: err
            
        });
    })

}

// (7) CRUD Operations

// 1. Inserting a record into transaction
exports.createTransaction = async (req, res) => {

    let transactions = new transactionsModel({
        Id: req.body.Id,
        Name: req.body.Name,
        TransactionId: req.body.TransactionId,
        Subscriber: req.body.Subscriber,
        Note: req.body.Note,
        Transaction: req.body.Transaction,
        Payment: req.body.Payment
    })

    transactions.save().then((results) => {
        res.status(200).send({
            status: 200,
            message: "The transactions is created !",
            data: results

        })
    }).catch((err) => {
        res.status(500).send({
            status: 500,
            error: err
        })
    })
}

// 2. Updatating a record into transaction

exports.updateTransaction = async (req, res) => {

    transactionsModel.findOneAndUpdate(
        req.params.Id,
        {

            Name: req.body.Name,
            TransactionId: req.body.TransactionId,
            Subscriber: req.body.Subscriber,
            Note: req.body.Note,
            Transaction: req.body.Transaction,
            Payment: req.body.Payment


        },
        { new: true }
    ).then((transaction) => {
        if (transaction) {
            res.status(200).send({
                status: 200,
                success: true,
                message: "The Transaction is updated!."
            })
        } else {
            return res.status(404).send({ status: 404, success: false, message: "Transaction is not found!" })
        }

    }).catch((err) => {

        res.status(500).send({
            status: 500,
            error: err
        })
    })


}
// # 3. Deleting record
exports.deleteTransaction = (req, res) => {
    transactionsModel.findOneAndRemove(req.params.Id).then(transaction => {
        if (transaction) {
            return res.status(200).send({ status: 200, success: true, message: 'The transaction is deleted!' })
        } else {
            return res.status(404).send({ status: 404, success: false, message: "transaction not found!" })
        }
    }).catch(err => {
        res.status(500).send({
            status: 500,
            success: false,
            error: err
        })
    })
}

// Getting Transations
exports.TransactionGet = (req, res) => {
    transactionsModel.find().then((data) => {
        res.status(200).send({
            status: 200,
            data: data
        })
    }).catch((err) => {
        res.status(500).send({
            status: 500,
            error: err
        })
    })
}