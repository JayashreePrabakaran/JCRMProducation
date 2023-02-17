const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send("Access denied. No Token Provided.");
    try {
        const userDetail = jwt.verify(token, 'JCRM_TOKEN');
        req.user = userDetail
        next();
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
}   