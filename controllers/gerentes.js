import { Gerente } from "../models/Gerentes.js";

const paginaGerentes = async (req, res) => {
    const gerentes = await Gerente.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
    });

    res.render("gerentes", {
        pagina : "Gerentes",
        gerentes
    });
}

const paginaRegistrarHoteles = async (req, res = response) => {
    const gerentes = await Gerente.findAll({
        attributes: ['id_grt','nombre', 'ap_paterno', 'ap_materno']
    });

    console.log(gerentes)

    res.render("registrar_hoteles", {
        pagina: "Registrar Hoteles",
        gerentes
    });
};

export {
    paginaGerentes,
    paginaRegistrarHoteles
}