const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const SinisterController = controllers.SinisterController;

const sinisterRouter = express.Router();
sinisterRouter.use(bodyParser.json());
sinisterRouter.use(bodyParser.urlencoded({ extended: true }))


sinisterRouter.get('/', function(req, res) {
  const name = req.query.name;
  SinisterController.getAll(name)
  .then( (sinisters) => {
    res.json(sinisters);
  })
  .catch( (err) => {
    console.error(err);
    res.status(500).end();
  })
});


sinisterst('/', function(req,res) {
    const nb_people = req.body.nb_people;
    const localisation = req.body.localisation;
    const comment = req.body.comment;

    if(  nb_people === undefined || localisation === undefined ||| ) {
        res.status(400).json('Vous n\'avez pas rempli un des paramètres requis. Veuillez réessayer.').end();
        return;
    }
    SinisterController.add(nb_people, localisation, comment)
      .then( (p) => {
          res.status(201).json(p);
      })
      .catch( (err) => {
          console.error(err);
          res.status(500).end();
      });
});


sinisterRouter.delete('/', function(req, res){
  const id = req.query.id;
  SinisterController.find(id)
    .then((user) => {
      if (user){

      SinisterController.del(id)
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
