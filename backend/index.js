'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 8000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://db:27017/portafolio', { useFindAndModify: false })
        .then(() => {
          console.log("conexión a la base de datos establecida exitosamente...");

          // creating server
          app.listen(port, () => {
            console.log("connection enabled url localhost:8000");
          });
        })
        .catch( err => (console.log(err)));