const express = require('express');
const moment = require('moment-timezone');
const auth = require('./../middleware/auth');
const writeLogs = require('./../middleware/writeLogs');
const { request } = require('express');
const Users = require('./../models/Users');
const Leads = require('./../models/Leads');
const PaymentDetails = require('./../models/PaymentDetails');

const router = express.Router();

router.get(`/dashboard`, auth, async (request, response) => {
    console.log(request.user)
    const { Name } = request.user;
    const events = await Leads.find({ CreatedDate: new Date() } );
    const pending = await Leads.find({ CreatedDate: { $lte: new Date() } });
    const customers = await Leads.find({ Status: "Customer", Assigned: Name});
    return response.status(200).send(true);

})


router.get(`/configurations`, auth, async (request, response) => {
    try {
        const users = await Users.find({});
        return response.status(200).send(users);
    } catch (err) {
        return response.status(500).send({ msg: err.message });
    }
})

router.get(`/leads`, auth, async (request, response) => {
    let { latest } = request.params;
    if (latest) {
        try {

            const recordsets = await Leads.find({}, null, { sort: { Date: -1 } }).limit(10);
            return response.status(200).send(recordsets);
        } catch (err) {
            return response.status(500).send({ msg: err.message });
        }
    } else {
        try {
            const recordsets  = await Leads.find({});
            return response.status(200).send(recordsets);
        } catch (err) {
            return response.status(500).send({ msg: err.message });
        }
    }
})

router.get(`/customers`, auth, async (request, response) => {
    let { latest } = request.params;
    if (latest) {
        try {
            const recordsets = await Leads.find({}, null, { sort: { Date: -1 } }).where({ Status: "Customer" }).limit(10);
            return response.status(200).send(recordsets);
        } catch (err) {
            return response.status(500).send({ msg: err.message });
        }
    } else {
        try {
            const recordsets = await Leads.find({}).where({ Status: "Customer" });
            return response.status(200).send(recordsets);
        } catch (err) {
            return response.status(500).send({ msg: err.message });
        }
    }
})

router.post(`/leads`, auth, writeLogs, async (request, response) => {
    let { name, businessName, phone, email, address, status, assigned, date, walkin, comments } = request.body;
    let { Id } = request.user;
    try {

        const leads = new Leads({
            Name: name,
            BusinessName: businessName,
            Phone: phone,
            Address: address,
            Status: status,
            Assigned: assigned,
            Date: moment(date).format('YYYY-MM-DD'),
            Comments: comments,
            Email: email,
            Walkin: walkin ? 1 : 0,
            CreatedByUser: Id,
            ModifyByUser: Id,
            CreatedDate: moment()
        })
        await leads.save();
        return response.status(200).send({ msg: 'Lead Created.' });
    } catch (err) {
        return response.status(500).send({ msg: err.message });
    }
})

router.put(`/leads/:id`, auth, writeLogs, async (request, response) => {
    let { status, comments } = request.body;
    let { id } = request.params;
    let { Id } = request.user;
    try {
        await Leads.findByIdAndUpdate(
            id,
            {
                $set: {
                    Status: status,
                    Comments: comments,
                    ModifyByUser: Id
                }
            },
            { new: true }
        )

        if (status == 'Customer') {
            const paymentDetails = new PaymentDetails({
                customerID: '2',
                PaymentType: 'Cash',
                PaidAmount: '100',
                Subscription: '3 Days',
                DurationFromDate: moment().format('YYYY-MM-DD'),
                DurationToDate: moment().format('YYYY-MM-DD'),
            })
            const userData = await paymentDetails.save();
        }

        return response.status(200).send({ msg: 'Lead Updated.' });
    } catch (err) {
        return response.status(500).send({ msg: err.message });
    }
})

module.exports = router