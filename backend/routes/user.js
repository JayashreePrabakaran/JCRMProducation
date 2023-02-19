const express = require('express');
const moment = require('moment-timezone');
const auth = require('./../middleware/auth');
const writeLogs = require('./../middleware/writeLogs');
const Users = require('./../models/Users');
const Leads = require('./../models/Leads');
const PaymentDetails = require('./../models/PaymentDetails');

const router = express.Router();

router.get(`/dashboard`, auth, async (request, response) => {
    const { _id, Roles } = request.user;
    let events, pending, customers;
    if (Roles === 'user') {
        events = await Leads.find({ CreatedDate: moment().format('YYYY-MM-DD'), Assigned: _id });
        pending = await Leads.find({ CreatedDate: { $lte: new Date() }, Assigned: _id });
        customers = await Leads.find({ Status: "Customer", Assigned: _id });
    } else {
        events = await Leads.find({ CreatedDate: moment().format('YYYY-MM-DD') });
        pending = await Leads.find({ CreatedDate: { $lte: new Date() } });
        customers = await Leads.find({ Status: "Customer" });
    }

    return response.status(200).send({ events, pending, customers });

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
    const { _id, Roles } = request.user;
    let { latest } = request.query;
    if (latest == 'true') {
        try {
            let recordsets;
            if (Roles === 'user') {
                recordsets = await Leads.find({ Assigned: _id }, null, { sort: { Date: -1 } }).where({ Status: { $ne: "Customer" } }).limit(10);
            } else {
                recordsets = await Leads.find({}, null, { sort: { Date: -1 } }).where({ Status: { $ne: "Customer" } }).limit(10);
            }
            return response.status(200).send(recordsets);
        } catch (err) {
            return response.status(500).send({ msg: err.message });
        }
    } else {
        try {
            let recordsets;
            if (Roles === 'user') {
                recordsets = await Leads.find({ Assigned: _id }).where({ Status: { $ne: "Customer" } });
            } else {
                recordsets = await Leads.find({}).where({ Status: { $ne: "Customer" } });
            }
            return response.status(200).send(recordsets);
        } catch (err) {
            return response.status(500).send({ msg: err.message });
        }
    }
})

router.get(`/customers`, auth, async (request, response) => {
    const { _id, Roles } = request.user;
    let { latest } = request.query;
    if (latest == 'true') {
        try {
            const recordsets = await Leads.find({ Assigned: _id }, null, { sort: { Date: -1 } }).where({ Status: "Customer" }).limit(10);
            return response.status(200).send(recordsets);
        } catch (err) {
            return response.status(500).send({ msg: err.message });
        }
    } else {
        try {
            const recordsets = await Leads.find({}).where({ Status: "Customer" });
            // const paymentPromise = recordsets.map(customer => {
            //     return new Promise((resolve, reject) => {

            //     })
            // })
            return response.status(200).send(recordsets);
        } catch (err) {
            return response.status(500).send({ msg: err.message });
        }
    }
})

router.post(`/leads`, auth, writeLogs, async (request, response) => {
    let { name, businessName, phone, email, address, status, assigned, date, walkin, comments } = request.body;
    let { _id: Id } = request.user;
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
        const leadData = await leads.save();
        console.log(leadData)
        return response.status(200).send({ msg: 'Lead Created.' });
    } catch (err) {
        return response.status(500).send({ msg: err.message });
    }
})

router.put(`/leads/:id`, auth, writeLogs, async (request, response) => {
    let { status, comments, assigned, walkin, date, paymentType, paidAmount, pendingAmount, subscription, fromDate, toDate } = request.body;
    let { id } = request.params;
    let { _id: Id } = request.user;
    try {
        await Leads.findByIdAndUpdate(
            id,
            {
                $set: {
                    Status: status,
                    Comments: comments,
                    ModifyByUser: Id,
                    Assigned: assigned,
                    WalkIn: walkin ? 1 : 0,
                    Date: moment(date).format('YYYY-MM-DD'),
                }
            },
            { new: true }
        )

        if (status == 'Customer') {
            const paymentDetails = new PaymentDetails({
                customerID: String(id),
                PaymentType: paymentType,
                PaidAmount: paidAmount,
                PendingAmount: pendingAmount,
                Subscription: subscription,
                DurationFromDate: moment(fromDate).format('YYYY-MM-DD'),
                DurationToDate: moment(toDate).format('YYYY-MM-DD'),
            })
            await paymentDetails.save();
        }

        return response.status(200).send({ msg: 'Lead Updated.' });
    } catch (err) {
        return response.status(500).send({ msg: err.message });
    }
})

module.exports = router