import { Router } from "express"
import {
    paginaInicio, 
    paginaAcercaDe, 
    paginaContactanos
} from "../controllers/paginas.js"

import {
    paginaGerentes,
    paginaRegistrarHoteles
} from "../controllers/gerentes.js"

import {
    registrarHotel,
    paginaConsultarHoteles,
    modificarHoteles,
    eliminarHoteles
} from "../controllers/hoteles.js"

import {
    registrarHabitaciones,
    paginaConsultarHabitaciones,
    paginaRegistrarHabitaciones,
    modificarHabitaciones,
    eliminarHabitaciones
} from "../controllers/habitaciones.js"

const router = Router();

//Desplegamos front de páginas
router.get("/",                       paginaInicio);
router.get("/registrarHoteles",       paginaRegistrarHoteles);
router.get("/consultarHoteles",       paginaConsultarHoteles);
//router.get("/acercaDe",               paginaAcercaDe);
router.get("/contactanos",            paginaContactanos);
router.get("/gerentes",               paginaGerentes);
router.get("/registrarHabitaciones",  paginaRegistrarHabitaciones);
router.get("/consultarHabitaciones",  paginaConsultarHabitaciones);
router.get("/modificarHoteles",       modificarHoteles);
router.get("/modificarHabitaciones",  modificarHabitaciones);
router.get("/eliminarHoteles",        eliminarHoteles);
router.get("/eliminarHabitaciones",   eliminarHabitaciones);

//Peticiones POST
router.post("/registrarHoteles",      registrarHotel);
router.post("/registrarHabitaciones", registrarHabitaciones);



export default router;