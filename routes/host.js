const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const HostController = controllers.HostController;
const utils = require('../utils');
const hostRouter = express.Router();
hostRouter.use(bodyParser.json());
hostRouter.use(bodyParser.urlencoded({ extended: true }))


hostRouter.get('/:id?', /*utils.checkToken,*/ function(req, res) {
    const name = req.query.name;
    const id = req.params.id;
    HostController.getAll(id)
        .then( (hosts) => {
            res.json(hosts);
        })
        .catch( (err) => {
            console.error(err);
            res.status(500).end();
        })
});

hostRouter.get('/accept_sinister', function(req, res) {
    // Envoi notif
})

hostRouter.post('/', /*utils.checkToken,*/ function(req,res) {
    const distance = req.body.distance;
    const address_city = req.body.address_city;
    const address_name = req.body.address_name;
    const address_zipcode = req.body.address_zipcode
    const nb_bed = req.body.nb_bed
    const id_user = req.body.id_user

    if( distance === undefined 
        || address_name === undefined 
        || address_zipcode === undefined 
        || address_city === undefined 
        || nb_bed === undefined 
        || id_user === undefined ) {
        res.status(400).end();
        return;
    }
    HostController.add(distance, nb_bed, address_number, address_city, address_name, address_zipcode, id_user)
      .then( (host) => {
          res.status(201).json(host);
      })
      .catch( (err) => {
          console.error(err);
          res.status(500).end();
      });
});

hostRouter.put('/:id', /*utils.checkToken,*/ function(req,res) {
    const id_host = req.params.id;
    const distance = req.body.distance;
    const address_city = req.body.address_city;
    const address_name = req.body.address_name;
    const address_zipcode = req.body.address_zipcode
    const nb_bed = req.body.nb_bed
    const id_user = req.body.id_user;
    if( distance === undefined 
        || address_name === undefined 
        || address_zipcode === undefined 
        || address_city === undefined 
        || nb_bed === undefined 
        || id_host === undefined 
        || id_user === undefined ) {
            
            res.status(400).end();
            return;
    }
    HostController.getAll(id_host)
        .then( (host) => {
            if( host[0] !== undefined ) {
                HostController.update(id_host, distance, nb_bed, address_city, address_name, address_zipcode, id_user)
                    .then( (host) => {
                        res.status(200).json(host).end()
                    })
                    .catch( (err) => {
                        console.log(err);
                        res.status(500).end();
                    })
            }
        })
})

hostRouter.delete('/:id', /*utils.checkToken,*/function(req, res){
  const id = req.params.id;
  HostController.find(id)
    .then((user) => {
      if (user){

      HostController.delete(id)
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
