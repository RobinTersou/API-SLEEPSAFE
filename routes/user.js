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
userRouter.get('/:id', function(req,res) {

});

/**
 * Route : user/
 * Method : POST
 * Ajout d'un User
 */
userRouter.post('/', function(req,res) {

});

/**
 * Route : user/
 * Method : PUT
 * Modification d'un User
 */
userRouter.put('/', function(req, res) {

})

/**
 * Route : user/
 * Method : DELETE
 * Suppression d'un User
 */
userRouter.delete('/', function(req,res) {

})