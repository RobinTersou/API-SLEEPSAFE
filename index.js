const express = require('express');
//const jwt = require('jsonwebtoken');
const cors = require('cors');
const ModelIndex = require('./models');
const RouteManager = require('./routes');


ModelIndex
    .openDatabase()
    .then(_startServer)
    .catch((err) => {
      console.error(err);
    });

// INTERNAL

function _startServer() {

    const app = express();

    app.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false
    }));
    RouteManager.attach(app);

    app.listen(3000, function() {
      console.log('Server started on 3000...');
  });
}