const ModelIndex = require('../models');
const Host = ModelIndex.Host;
const Op = ModelIndex.sequelize.Op;

const HostController = function() { };

HostController.getAll = function (id) {
    const options = {
        include: [{
            model: ModelIndex.User,
            as : 'user'
        }]
    };
    const where = {};

    if( id !== undefined ) {
        where.id = {
            [Op.eq]:`${id}`
        };
    }
    options.where = where;
    return Host.findAll(options);
};

/**
*  Creation d'un element en base
**/

HostController.add = function(distance, nb_bed, address_city, address_name, address_zipcode, id_user) {
    return Host.create({
        distance: distance,
        nb_bed : nb_bed,
        address_city : address_city,
        address_name : address_name,
        address_zipcode : address_zipcode,
        id_user : id_user
    });
};


HostController.update = function(id, distance , nb_bed, address_city, address_name,address_zipcode ) {
    return Host.update({
      distance: distance,
      nb_bed : nb_bed,
      address_city : address_city,
      address_name : address_name,
      address_zipcode : address_zipcode
    }, {
        where : {
            id : id
        }
    })
}

HostController.find = function(id){
  return Host.findById(id);
}


HostController.delete = function(id){
  const options = {};
  const where = {};
  if (id !== undefined){
    where.id = {
      [Op.eq]: `${id}`
    };
  }
  options.where = where;
  return Host.destroy(options);
}


// Export du controller
module.exports = HostController;
