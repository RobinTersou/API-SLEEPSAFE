const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserController = controllers.UserController;

const loginRouter = express.Router();
loginRouter.use(bodyParser.urlencoded({
    extended: true
}));
loginRouter.use(bodyParser.json());

/**
 * Route : /
 * Method : POST
 * Connexion
 */
loginRouter.post('/', function(req, res) {
    
    const email = req.body.email;
    const password = req.body.password;
    if( email === undefined || password === undefined ) {
        res.status(400).end();
    }
    UserController.exist(email)
        .then( (user) => {
            
            if( !user ) {
                res.status(404).end();
                return;
            }
            if( UserController.verifyPassword(password, user.password) ) {
                
                var token = jwt.sign({ user : "sleepsafe" }, config.secret,);
                console.log("OKKKKKKKKKKKKKKKKKK");
                res.status(200).json({token}).end();
            } else {
                console.log("ALUYIYTZD");
                res.status(404).end();
            }
        })
        .catch( (err) => {
            console.error(err);
            res.status(500).end();
        })
})

module.exports = loginRouter;