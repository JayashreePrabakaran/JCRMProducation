const mongoose = require('mongoose');

const PaymentDetailsSchema = mongoose.Schema({
    customerID: {
        type: String
    },
    PaymentType: {
        type: String
    },
    PaidAmount: {
        type: String
    },
    Subscription: {
        type: String
    },
    PendingAmount: {
        type: String
    },
    DurationFromDate: {
        type: Date
    },
    DurationToDate: {
        type: Date
    }
})

module.exports = mongoose.model('PaymentDetails', PaymentDetailsSchema);