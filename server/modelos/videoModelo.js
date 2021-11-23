const Joi = require('joi');
const mongoose = require('mongoose');


const videoDb = mongoose.model("video",new mongoose.Schema({

    titulo:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
    codigo:{
        type: String,
        required: true,
    },
    resolucion:{
        type: String,
        required: true,
    }


}));

exports.videoDb = videoDb;

//ENSERIO METELE VALIDACION DE DATOS A ESTA MIERDA 