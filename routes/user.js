const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const UserController = controllers.UserController;

const userRouter = express.Router();
userRouter.use(bodyParser.json());

/**
 * Route : user/
 * Method : GET
 * Recupération d'un ou plusieurs User
 * Params : id
 */
userRouter.get('/:id?', utils.checkToken, function(req,res) {
    const id = req.params.id;

    UserController.getAll(id)
        .then( (user) => {
            if( user[0] !== undefined ) {
                res.status(200).json(user)
            } else {
                res.status(206).end();
            }
        })
        .catch( (err) => {
            res.status(500).end();
        })
});

/**
 * Route : user/
 * Method : POST
 * Ajout d'un User
 */
userRouter.post('/', function(req,res) {
    const id_phone = req.body.id_phone;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone_number = req.body.phone_number;
    const password = req.body.password;

    if( id_phone === undefined 
        || email === undefined
        || firstname === undefined
        || lastname === undefined
        || phone_number === undefined
        || password === undefined ) {
            res.status(400).end();
            return;
        }
    UserController.add(id_phone, email, firstname, lastname, phone_number, password )
        .then( (user) => {
            res.status(201).json(user);
        })
        .catch( (err) => {
            console.log(err); 
            res.status(500).end();
        })
});

/**
 * Route : user/
 * Method : PUT
 * Modification d'un User
 */
userRouter.put('/:id', utils.checkToken, function(req, res) {
    const id = req.params.id;
    const id_phone = req.body.id_phone;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone_number = req.body.phone_number;

    if( id_phone === undefined 
        || email === undefined
        || firstname === undefined
        || lastname === undefined
        || phone_number === undefined
        || id === undefined ) {
            res.status(400).end();
            return;
        }
    UserController.getAll(id)
        .then( (user) => {
            if( user[0] !== undefined ) {
                UserController.update(id, id_phone, email, firstname, lastname, phone_number)
                    .then( (user) => {
                        res.status(200).json(user)
                    })
                    .catch( (err) => {
                        console.log(err);
                        res.status(500).end();
                    })
            }
        })
        .catch( (err) => {
            console.log(err);            
            res.status(500).end()
        })
})

/**
 * Route : user/
 * Method : DELETE
 * Suppression d'un User
 */
userRouter.delete('/:id', utils.checkToken, function(req,res) {
    const id = req.params.id;
    if( id === undefined ) {
        res.status(400).end();
        return;
    }
    UserController.getAll(id)
        .then( (user) => {
            if( user[0] !== undefined ) {
                UserController.delete(id)
                    .then( (user) => {
                        res.status(200).json(user)
                    })
                    .catch( (err) => {
                        res.status(500).end();
                    })
            } else {
                res.status(404).end();
            }
        })
        .catch( (err) => {
            console.log(err);
            res.status(500).end()
        })
})

module.exports = userRouter;