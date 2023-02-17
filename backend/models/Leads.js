const mongoose = require('mongoose');

const LeadDetailsSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    BusinessName: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
    },
    Phone: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
    },
    Status: {
        type: String,
        default: "",
    },
    Assigned: {
        type: String,
        default: "",
    },
    Email: {
        type: String,
        default: "",
    },
    Comments: {
        type: String,
        default: "",
    },
    WalkIn: {
        type: Boolean,
        default: false,
    },
    CreatedByUser: {
        type: String,
        default: "",
    },
    ModifyByUser: {
        type: String,
        default: "",
    },
    CreatedDate: {
        type: Date,
        default: "",
    },

})

module.exports = mongoose.model('Leads', LeadDetailsSchema);