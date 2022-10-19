import { response } from "express"

const paginaInicio = (req, res = response) => {
    res.render("inicio", {
        pagina: "Inicio"
    })
};

const paginaAcercaDe = (req, res = response) => {
    res.render("acerca_de", {
        pagina: "Acerca De Nosotros"
    })
};

const paginaContactanos = (req, res = response) => {
    res.render("contactanos", {
        pagina: "Contactanos"
    })
};


export {
    paginaInicio,
    paginaAcercaDe,
    paginaContactanos
}