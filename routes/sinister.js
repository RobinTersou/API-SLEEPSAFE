const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const SinisterController = controllers.SinisterController;
const utils = require('../utils');

const sinisterRouter = express.Router();
sinisterRouter.use(bodyParser.json());
sinisterRouter.use(bodyParser.urlencoded({ extended: true }))


sinisterRouter.get('/current', function(req, res) {
    SinisterController.getAllCurrent()
        .then( (sinisters) => {
            res.status(200).json(sinisters)
        })
        .catch( (err) => {
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
