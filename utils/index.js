const config = require('../config');
const Utils = function() {};
const jwt = require('jsonwebtoken')

Utils.checkToken = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['authorization'];
    console.log(token)
    if( token ) {
        try {
            var decoded = jwt.verify(token, config.secret);
            next();
        } catch (err) {
            console.log(err);
            res.status(403).end();
        }
    } else {
        res.status(500).end();
    }
}

module.exports = Utils;