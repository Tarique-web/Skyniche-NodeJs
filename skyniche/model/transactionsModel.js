 
const mongoose = require("../config/db");

const categorySchema = mongoose.Schema({
    Id: {
        type: Number,
        
    },
    Name: {
        type: String,
        required: true,
    },
    TransactionId: {
        type: String,
        required: true,
    },
    Transaction: [
       {
        ItemId:{
            type:String,
        } ,
        price:{
            type:Number
        }
       },
    ],
    Subscriber: {
        type: Boolean,
        defualt:false
    },
   Payment: { 
    
        Type:{
            type:String
        },
        Total:{
            type:Number
        },
        Success:{
            type:Boolean,
            defualt:false
        }
      
    },
    Note:{
        type:String
    }
},
{
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
})


module.exports = mongoose.model('transactions', categorySchema);
