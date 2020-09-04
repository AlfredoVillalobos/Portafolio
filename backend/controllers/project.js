'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path')

var controller = {
  home: function (req, res){
    return res.status(200).send({
      message: 'Home'
    });
  },

  test: function(req, res){
    return res.status(200).send({
      message: 'test'
    });
  },

  saveProject: function(req, res){
    console.log(req.body)
    var project = new Project();
    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;
    project.save((err, projectStored) => {
      if(err) return res.status(500).send({ errors: err.message });
      if(!projectStored) return res.status(404).send({ message: 'No se pudo guardar el project'});
      return res.status(200).send({ project: projectStored });
    })
  },

  getProject: function(req, res){
    var projectId = req.params.id;
    if(projectId == null )return res.status(404).send({ message: 'Proyecto no existe' })

    Project.findById(projectId, (err, project) => {
      if(err) return res.status(500).send({ errors: err.message })
      if(!project) return res.status(404).send({ message: 'Proyecto no existe' })
      return res.status(200).send({ 
        project
      })
    });
  },

  getProjects: function(req, res){
    Project.find({}).sort('-year').exec((err, projects) => {
      if(err) return res.status(500).send({ errors: err.message });
      if(!projects) return res.status(404).send({ message: 'No se encontraron projectos' });
      return res.status(200).send({ projects });
    }); 
  },

  updateProject: function(req, res){
    var projectId = req.params.id;
    var update = req.body;
    Project.findOneAndUpdate({_id: projectId}, update, {new:true}, (err, projectUpdate) =>{
      if(err) return res.status(500).send({ errors: err.message });
      if(!projectUpdate) return res.status(404).send({ message: 'Registro no encontrado' });
      return res.status(200).send({ project: projectUpdate });
    });
  },

  deleteProject: function(req, res){
    debugger
    var projectId = req.params.id;
    Project.findOneAndRemove({_id: projectId}, (err, projectRemove) => {
      if(err) return res.status(500).send({ errors: err.message });
      if(!projectUpdate) return res.status(404).send({ message: 'Registro no encontrado para eliminar' });
      return res.status(200).send({ project: projectRemove });
    });
  },

  uploadImage: function(req, res){
    var projectId = req.params.id;
    var fileName = 'Image no subida...';
    if(req.files){
      var filePath =  req.files.image.path;
      var fileSplit = filePath.split('/');
      var fileName = fileSplit[1];
      var extSplit = fileName.split('.');
      var fileExt = extSplit[1];
      if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
        Project.findOneAndUpdate({_id: projectId}, {image: fileName}, {new:true}, (err, projectUpdate) => {
          if(err) return res.status(500).send({ errors: err.message });
          if(!projectUpdate) return res.status(404).send({ message: 'Registro no encontrado para eliminar' });
          return res.status(200).send({ project: projectUpdate });
        });
      }else{
        fs.unlink(filePath, (err) => {
          return res.status(200).send({ message: 'Extention not valid' });
        })
      }

    }else{
      return res.status(200).send({
        files: fileName
      })
    }
  },

  getImageFile: function(req, res){
    var file = req.params.image;
    var path_file = './uploads/'+file;
    fs.exists(path_file, (exists)=> {
      if(exists){
        return res.sendFile(path.resolve(path_file));
      }else{
        return res.status(200).send({
          message: 'no existe la imagen'
        })
      }
    })
  }
};  

module.exports = controller;