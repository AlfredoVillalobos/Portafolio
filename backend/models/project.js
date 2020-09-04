'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String
})


// mongoose sobre escribe el nombre del modelo convirtiendo el nombre de la tabla a minuscula y pluralizando el nombre
module.exports = mongoose.model('Project', ProjectSchema);