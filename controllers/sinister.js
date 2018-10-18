const ModelIndex = require('../models');
const Sinister = ModelIndex.Host;
const Op = ModelIndex.sequelize.Op;

const SinisterController = function() { };

/**
*  Creation d'un element en base
**/
SinisterController.add = function(id_phone, nb_people,localisation,comment) {

    return Sinister.create({
        id_phone: id_phone,
        nb_people : nb_people,
        localisation : localisation,
        comment : comment
    });
};


SinisterController.update = function(id_phone , nb_people, localisation , comment ) {
    return Sinister.update({
      id_phone: id_phone,
      nb_people : nb_people,
      localisation : localisation,
      comment : comment
    }, {
        where : {
            id : id
        }
    })
}

SinisterController.find = function(id){
  return Sinister.findById(id);
}

SinisterController.getAll = function (search) {
    const options = {};
    const where = {};

    if( search !== undefined ) {
        where.name = {
            [Op.like]:`${search}%`
        };
    }
    options.where = where;
    return Sinister.findAll(options);
};


SinisterController.del = function(search){
  const options = {};
  const where = {};
  if (search !== undefined){
    where.id = {
      [Op.eq]: search
    };
  }
  options.where = where;
  return Host.destroy(options);
}


// Export du controller
module.exports = SinisterController;
