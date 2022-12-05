import express from "express";
import { config } from "dotenv";
import db from "../config/db.js";
import router_paginas from "../routes/paginas.js";
import {relacionHotelGerente, relacionHotelHabitaciones,} from "../config/relaciones.js";
import session from "express-session";
import fileupload from "express-fileupload";
import { nanoid } from "nanoid";

import  fileExtLimiter  from "../middleware/fileExtLimiter.js";
import  fileSizeLimiter  from "../middleware/fileSizeLimiter.js";
import  filesPayloadExists  from "../middleware/filesPayloadExists.js";
import  path  from "path";





class Server {
  constructor() {
    //Llamando a express, dotenv y a la base de datos
    this.conf_env = config();
    this.app = express();
    this.db = db;
    this.route = {
      contexto: "/",
      api_rest: "/api",
    };

    //Definiendo el puerto
    this.port = process.env.PORT || 1802;

    //Middelwares
    this.middlewares();

    //Plantillas
    this.plantillas();

    //Rutas
    this.routes();
  }

  middlewares() {
    //Agregar parser body para obtener los datos de un formulario
    this.app.use(express.urlencoded({ extended: true }));

    //Definiendo carpeta publica
    this.app.use(express.static("public"));

    //Conexion a BBDD
    this.db
      .authenticate()
      .then(() => console.log("Conexion Exitosa"))
      .catch((error) => console.log(error));

    relacionHotelGerente();
    relacionHotelHabitaciones();


    //definiendo la sesion ROLES -- AQUI CRASHEA, arreglar bien el pex
    this.app.use(
      session({
        secret: nanoid(),
        resave: true,
        saveUninitialized: true,
      })
    );

    //midleware SESIONES ... ARREGLAR CSM 
   /* this.app.use((req, res, next) => {
      const ano = new Date();
      res.locals.tiempo = " " + ano.getFullYear();
      console.log(req.url);

      try {
        if (req.url === "/credenciales") {
          const { usuario, clave } = req.body;
          console.log(usuario + " " + clave);
          if (usuario === "demo" && clave === "123") {
            console.log("Entrada 1");
            req.session.nombre = "FES";
            req.session.rol = "adm";
            console.log(req.session.nombre + " " + req.session.rol);
            res.render("inicio", {
              pagina: "datos",
              usuario: req.session.nombre,
            });
          } else {
            res.render("login", {
              pagina: "Credenciales",
            });
          }
        } else {
          if (req.session.rol === undefined) {
            console.log("no existe......1 " + req.session.rol);
            res.render("inicio", {
              pagina: "Credenciales",
            });
          } else {
            console.log("si existe......2 " + req.session.rol);

            return next();
          }
        }
      } catch (e) {
        console.log("no existe......");
        res.render("login", {
          pagina: "Credenciales",
        });
      }
    });*/

    this.app.post(
      "/upload",
      fileupload({ createParentPath: true }),
      filesPayloadExists,
      fileExtLimiter([".png", ".jpg", ".jpeg"]), //Tipos de Archivos
      fileSizeLimiter,
      (req, res) => {
        const files = req.files;
        console.log(files);

        Object.keys(files).forEach((key) => {
          const filepath = path.join("public", "temp", files[key].name); //Entra a public y luego a temp.
          console.log(filepath);
          files[key].mv(filepath, (err) => {
            if (err)
              return res.status(500).json({ status: "error", message: err });
          });
        });

        return res.json({
          status: "success",
          message: Object.keys(files).toString(),
        });
      }
    );
  }

  routes() {
    this.app.use(this.route.contexto, router_paginas);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación escuchando en puerto ${this.port}`);
    });
  }

  plantillas() {
    //definiendo pug para plantillas
    this.app.set("view engine", "pug");
  }
}

export default Server;
