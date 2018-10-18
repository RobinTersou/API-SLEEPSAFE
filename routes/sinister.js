const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const SinisterController = controllers.SinisterController;
const utils = require('../utils');
const HostController = controllers.HostController;
const sinisterRouter = express.Router();
sinisterRouter.use(bodyParser.json());
sinisterRouter.use(bodyParser.urlencoded({ extended: true }))


sinisterRouter.get('/current', function(req, res) {
    SinisterController.getAllCurrent()
        .then( (sinisters) => {
            res.status(200).json(sinisters)
        })
        .catch( (err) => {
            console.log(err);
            res.status(500).end();
        })
})

sinisterRouter.get('/:id?', utils.checkToken, function(req, res) {
    const id = req.params.id;
    SinisterController.getAll(id)
        .then( (sinisters) => {
            res.status(200).json(sinisters);
        })
        .catch( (err) => {
            console.error(err);
            res.status(500).end();
        })
});



sinisterRouter.post('/', function(req,res) {
    const id_phone = req.body.id_phone
    const nb_people = req.body.nb_people;
    const localisation = req.body.localisation;
    const comment = req.body.comment;
    const id_host = req.body.id_host;
    const id_status = req.body.id_status | 1;

    if( id_phone === undefined, nb_people === undefined || localisation === undefined ) {
        res.status(400).json('Vous n\'avez pas rempli un des paramètres requis. Veuillez réessayer.').end();
        return;
    }
    SinisterController.add(id_phone, nb_people, localisation, comment, id_host, id_status)
      .then( (p) => {
          res.status(201).json(p);
      })
      .catch( (err) => {
          console.error(err);
          res.status(500).end();
      });
});

sinisterRouter.put('/hosting', function (req,res) {
    const id_phone = req.body.id_phone;
    const id_host = req.body.id_host;
    let nb_people = undefined;
    let nb_lit = undefined;

    SinisterController.findByPhone(id_phone)
        .then((sinister) => {
            sinister = sinister[0];
            nb_people = sinister.nb_people;
            SinisterController.update(sinister.id, id_phone,sinister.nb_people,sinister.localisation,sinister.comment,"2", id_host)
                .then( (s) => {

                    if (sinister.nb_people === undefined) {
                        res.status(403).json('Data missing').end();
                        return;
                    }else {
                        HostController.find(parseInt(id_host))
                            .then( (host) => {
                                nb_lit = host.nb_bed - nb_people
                                if (nb_lit <= 0 ) {
                                    res.status(403).json('Nombre de lits inférieur à 0').end();
                                }
                                else {
                                  HostController.update(id_host, host.distance, parseInt(nb_lit), host.address_number, host.address_city, host.address_name, host.address_zipcode)
                                      .then ((host) => {
                                          res.status(201).json(host);
                                      })
                                }
                            })
                            .catch( (err) => {
                                console.log(err)
                                res.status(500).end();
                            })
                    }
                })
                .catch( (err) => {
                    console.log(err)
                    res.status(500).end()
                })

        });
})

sinisterRouter.put('/release', function (req,res) {
    const id_phone = req.body.id_phone;
    const id_host = req.body.id_host;
    let nb_people = undefined;
    let nb_lit = undefined;

    SinisterController.findByPhone(id_phone)
        .then((sinister) => {
            sinister = sinister[0];
            nb_people = sinister.nb_people;
            if (sinister.id_status === 3){
              res.status(403).json('id_status already at 3').end();
              return;

            }else {
            SinisterController.update(sinister.id, id_phone,sinister.nb_people,sinister.localisation,sinister.comment,"3", id_host)
                .then( (s) => {

                    if (sinister.nb_people === undefined) {
                        res.status(403).json('Data missing').end();
                        return;
                    }else {
                        HostController.find(parseInt(id_host))
                            .then( (host) => {



                                  nb_lit = host.nb_bed + nb_people;
                                  HostController.update(id_host, host.distance, parseInt(nb_lit), host.address_number, host.address_city, host.address_name, host.address_zipcode)
                                      .then ((host) => {
                                          res.status(201).json(host);
                                      })

                            })
                            .catch( (err) => {
                                console.log(err);
                                res.status(500).end();
                            })
                    }
                })
                .catch( (err) => {
                    console.log(err)
                    res.status(500).end()
                })
}
        });
})

sinisterRouter.delete('/:id', utils.checkToken, function(req, res){
  const id = req.params.id;
  SinisterController.find(id)
    .then((user) => {
      if (user){
          SinisterController.delete(id)
            .then((p) => {
                res.status(200).json("Sinister deleted");
            });
      }else{
          res.status(403).json("Sinister not found")
      }
    })
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        });
});

module.exports =sinisterRouter;
