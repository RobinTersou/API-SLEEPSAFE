const ModelIndex = require('../models');
const Sinister = ModelIndex.Sinister;
const Op = ModelIndex.sequelize.Op;

const SinisterController = function() { };

/**
*  Creation d'un element en base
**/
SinisterController.add = function(id_phone, nb_people,localisation,comment, id_host, id_status) {
    return Sinister.create({
        id_phone: id_phone,
        nb_people : nb_people,
        localisation : localisation,
        comment : comment,
        id_host : id_host,
        id_status : id_status
    });
};


SinisterController.update = function(id, id_phone , nb_people, localisation , comment, id_status, id_host) {
    return Sinister.update({
      id_phone: id_phone,
      nb_people : nb_people,
      localisation : localisation,
      comment : comment,
      id_status : id_status,
      id_host : id_host
    }, {
        where : {
            id : id
        }
    })
}

SinisterController.find = function(id){
  return Sinister.findById(id);
}

SinisterController.findByPhone = function(id_phone) {
    const options = {};
    const where = {};

    if( id_phone !== undefined ) {
        where.id_phone = {
            [Op.like]:`${id_phone}%`
        };
    }
    options.where = where;
    return Sinister.findAll(options);
}

SinisterController.getAll = function (id) {
    const options = {};
    const where = {};

    if( id !== undefined ) {
        where.id = {
            [Op.like]:`${id}%`
        };
    }
    options.where = where;
    return Sinister.findAll(options);
};

SinisterController.getAllCurrent = function() {
    const options = {};
    const where = {
        id_status : {
            [Op.eq] : 1
        }
    }
    options.where = where;
    return Sinister.findAll(options);
}

SinisterController.delete = function(search){
  const options = {};
  const where = {};
  if (search !== undefined){
    where.id = {
      [Op.eq]: search
    };
  }
  options.where = where;
  return Sinister.destroy(options);
}


// Export du controller
module.exports = SinisterController;
