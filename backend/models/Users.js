const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        default: ""
    },
    Roles: {
        type: String,
        default: ""
    },
    Status: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Users', UsersSchema);