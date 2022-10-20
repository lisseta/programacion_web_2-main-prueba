import { Router } from "express"
import {
    paginaInicio, 
    paginaAcercaDe, 
    paginaContactanos
} from "../controllers/paginas.js"

import {
    paginaGerentes,
    registrarGerente,
    paginaRegistrarGerentes,
    registrarGerente,
    paginaRegistrarGerentes,
    paginaRegistrarHoteles,
    modificarGerentes,
    eliminarGerente,
    modificarGerentes,
    eliminarGerente
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
router.get("/acercaDe",               paginaAcercaDe);
router.get("/contactanos",            paginaContactanos);
router.get("/gerentes",               paginaGerentes);
router.get("/registrarHabitaciones",  paginaRegistrarHabitaciones);
router.get("/consultarHabitaciones",  paginaConsultarHabitaciones);
router.get("/modificarHoteles",       modificarHoteles);
router.get("/modificarHabitaciones",  modificarHabitaciones);
router.get("/eliminarHoteles",        eliminarHoteles);
router.get("/eliminarHabitaciones",   eliminarHabitaciones);

router.get("/registrarGerentes",      paginaRegistrarGerentes);
router.get("/modificarGerentes",      modificarGerentes);
router.get("/eliminarGerentes",       eliminarGerente);

router.get("/registrarGerentes",      paginaRegistrarGerentes);
router.get("/modificarGerentes",      modificarGerentes);
router.get("/eliminarGerentes",       eliminarGerente);

//Peticiones POST
router.post("/registrarHoteles",      registrarHotel);
router.post("/registrarHabitaciones", registrarHabitaciones);
router.post("/registrarGerentes",     registrarGerente);

export default router;
