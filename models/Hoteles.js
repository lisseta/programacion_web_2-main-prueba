//Mapeo Relacion Objeto 'ORM'
import Sequelize from "sequelize";
import db from '../config/db.js';

export const Hotel = db.define('hoteles',{
    id_htl: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING
    },
    direccion:{
        type: Sequelize.STRING
    },
    telefono:{
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    id_grt: {
        type: Sequelize.INTEGER //Llave foranea
    }
}, {timestamps:false});