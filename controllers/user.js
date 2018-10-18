const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ModelIndex = require('../models');
const User = ModelIndex.User;
const passwordHash = require('password-hash');
const UserController = function() {};

UserController.getAll = function( id ) {
    const options = {};
    const where = {};

    if( id !== undefined ) {
        where.id = {
            [Op.eq] : `${id}`
        };
    }
    options.where = where;
    return User.findAll(options);
}

UserController.add = function( id_phone, email, firstname, lastname, phone_number, password ) {
    return User.create({
        id_phone : id_phone,
        email : email,
        firstname : firstname,
        lastname : lastname,
        phone_number : phone_number,
        password : passwordHash.generate(password)
    })
}

UserController.update = function(id, id_phone, email, firstname, lastname, phone_number ) {
    return User.update({
        id_phone : id_phone,
        email : email,
        firstname : firstname,
        lastname : lastname,
        phone_number : phone_number
    }, {
        where : {
            id : id
        }
    })
}

UserController.delete = function(id) {
    return User.destroy({
        where : {
            id: id
        }
    })
}

UserController.verifyPassword = function(pwd, pwd1) {
    if( passwordHash.verify(pwd, pwd1) ) {
        return true;
    }
    return false;
}



module.exports = UserController;