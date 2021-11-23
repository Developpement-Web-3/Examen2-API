const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TacheSchema = new Schema(
  {
    titre:{
      type: String, 
      required: true, 
      maxLength: 100
    },
    priorite:{
      type: String, 
      required: true, 
      enum: ['faible', 'modérée', 'élevée']
    }
  }
);

//Exportation du modèle Auteur
module.exports = mongoose.model('Tache', TacheSchema);

