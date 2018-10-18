const ModelIndex = require('../models');
const Host = ModelIndex.Host;
const Op = ModelIndex.sequelize.Op;

const HostController = function() { };

/**
*  Creation d'un element en base
**/
HostController.add = function(name, distance, nb_bed,address_number,address_city,address_name,address_zipcode) {

    return Burger.create({
        name: name,
        distance: distance,
        nb_bed : nb_bed,
        address_number : address_number,
        address_city : address_city,
        address_name  address_name,
        address_zipcode : address_zipcode
    });
};

HostController.find = function(id){
  return Host.findById(id);
}

HostController.getAll = function (search) {
    const options = {};
    const where = {};

    if( search !== undefined ) {
        where.name = {
            [Op.like]:`${search}%`
        };
    }
    options.where = where;
    return Host.findAll(options);
};


HostController.del = function(search){
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
module.exports = HostController;
