const moment = require('moment-timezone');
const LeadsHistory = require('../models/LeadsHistory');

module.exports = async (req, res, next) => {
    let { name, businessName, phone, email, address, status, assigned, date, walkin, comments, CreatedByUser, ModifyByUser, CreatedDate } = req.body;
    let { Id } = req.user;
    if (req.route.path === '/leads') {
        try {
            const leadsHistory = new LeadsHistory({
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
                CreatedDate: moment(),
                ModifyDate: moment()
            })
            const history = await leadsHistory.save();
            next();
        } catch (error) {
            console.log(error)
            next();
        }
    } else if (req.route.path === '/leads/:id') {
        try {
            const leadsHistory = new LeadsHistory({
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
                CreatedByUser: CreatedByUser,
                ModifyByUser: Id,
                CreatedDate: moment(CreatedDate).format('YYYY-MM-DD'),
                ModifyDate: moment()
            })
            const history = await leadsHistory.save();
            next();
        } catch (error) {
            console.log(error)
            next();
        }
    }
}