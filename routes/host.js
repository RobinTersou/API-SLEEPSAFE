const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const HostController = controllers.HostController;

const hostRouter = express.Router();
hostRouter.use(bodyParser.json());
hostRouter.use(bodyParser.urlencoded({ extended: true }))


hostRouter.get('/', function(req, res) {
  const name = req.query.name;
  HostController.getAll(name)
  .then( (hosts) => {
    res.json(hosts);
  })
  .catch( (err) => {
    console.error(err);
    res.status(500).end();
  })
});



 hostRouter.post('/', function(req,res) {
    const distance = req.body.distance;
    const address_number = req.body.address_number;
    const address_city = req.body.address_city;
    const address_name = req.body.address_name;
    const address_zipcode = req.body.address_zipcode
    const nb_bed = req.body.nb_bed

    if( distance === undefined || address_number === undefined ||| address_name === undefined ||| address_zipcode === undefined ||| address_city === undefined ||| nb_bed === undefined ) {
        res.status(400).json('Vous n\'avez pas rempli un des paramètres requis. Veuillez réessayer.').end();
        return;
    }
    HostController.add(distance , nb_bed ,address_number,address_city,address_name,address_zipcode)
      .then( (p) => {
          res.status(201).json(p);
      })
      .catch( (err) => {
          console.error(err);
          res.status(500).end();
      });
});


hostRouter.delete('/', function(req, res){
  const id = req.query.id;
  HostController.find(id)
    .then((user) => {
      if (user){

      HostController.del(id)
        .then((p) => {
            res.status(200).json("Host deleted");
        });
      }else{
          res.status(403).json("Host not found")
      }
    })
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        });
});

module.exports = hostRouter;
