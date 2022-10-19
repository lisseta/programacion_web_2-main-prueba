//Mapeo Relacion Objeto 'ORM'
import Sequelize from "sequelize";
import db from '../config/db.js';

export const Habitacion = db.define('habitaciones',{
    id_hbt: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    piso:{
        type: Sequelize.STRING
    },
    nombre:{
        type: Sequelize.STRING
    },
    refrigerador:{
        type: Sequelize.STRING
    },
    id_htl: {
        type: Sequelize.INTEGER //Llave foranea
    }
}, {timestamps:false});