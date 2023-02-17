const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();
const Users = require('./../models/Users');


router.post(`/login`, async (request, response) => {
    const { username, password } = request.body;
    try {
        const [user]= await Users.find({}).where({ Email: username });
        if (user) {
            if (user.Password === password) {
                const token = jwt.sign(_.omit(user.toJSON(), ['Password']), "JCRM_TOKEN", { expiresIn: '14d' });
                // response.cookie('jcrm_token', token, { maxAge: 14 * 24 * 60 * 60 * 1000 })
                response.status(200).send(token)
            } else {
                response.status(500).send({ msg: "Incorrect Password" })
            }
        } else {
            response.status(500).send({ msg: "No User Found With Given Username" })
        }
    } catch (error) {
        response.status(500).send({ msg: error.message })
    }
})


module.exports = router