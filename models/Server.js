import express  from "express";
import { config } from "dotenv";
import db from "../config/db.js";
import router_paginas from "../routes/paginas.js";
import { relacionHotelGerente, relacionHotelHabitaciones } from "../config/relaciones.js"

class Server {
    constructor() {
        //Llamando a express, dotenv y a la base de datos
        this.conf_env = config();
        this.app = express();
        this.db = db;
        this.route = {
            "contexto" : "/",
            "api_rest" : "/api" 
        }
    

        //Definiendo el puerto
        this.port = process.env.PORT || 1802

        //Middelwares
        this.middlewares();

        //Plantillas
        this.plantillas();

        //Rutas
        this.routes();
    }

    middlewares() {        
        //Agregar parser body para obtener los datos de un formulario
        this.app.use(express.urlencoded({extended:true}));
        
        //Definiendo carpeta publica
        this.app.use(express.static("public"));

        //Conexion a BBDD
        this.db.authenticate()
            .then(()=>console.log("Conexion Exitosa") )
            .catch(error => console.log(error));

        relacionHotelGerente();
        relacionHotelHabitaciones();
    }

    routes() {
        this.app.use(this.route.contexto, router_paginas);
    }

    listen() {
        this.app.listen(this.port,()=>{
            console.log(`Aplicación escuchando en puerto ${this.port}`);
        });
    }

    plantillas() {
        //definiendo pug para plantillas
        this.app.set("view engine","pug");
    }
}

export default Server;