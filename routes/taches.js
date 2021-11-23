const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Tache = require("../models/Tache");

/// GET Toutes les tâches 
router.get('/', async (req, res) => {
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Tache.find());
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});

/* GET les tâches selon la priorité                      */
/* Le paramètre doit contenir une chaîne de caractères.  */
/* Pour plus d'une catégorie, utiliser le délimitateur - */
router.get('/:categories', async (req, res) => {
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);    
    let categories = req.params.categories.split('-');
    console.log(categories);
    res.json(await Tache.find({'priorite':{$in:categories}}));
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});

/* POST tache */
router.post('/', async (req, res) => {  
  try {    
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await new Tache(req.body).save());
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});


/* DELETE tache */
router.delete('/:id', async (req, res) => {  
  try {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    res.json(await Tache.deleteOne({_id:req.params.id}));
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur:'Une erreur est survenue, veuillez contacter votre administrateur'});
  } finally {
    mongoose.connection.close();
  }
});

module.exports = router;
