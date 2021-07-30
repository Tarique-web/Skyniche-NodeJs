 
const mongoose = require("../config/db");   

const categorySchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default:""
    },
    BusinessType: {
        type: [String]
    },
    Reference: { 
        type: Number,
    },
    Company:{
        type:String
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    passwordHash: {
        type: String,
        required: true,
    },
},
{
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
})


module.exports = mongoose.model('customers', categorySchema);
