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

const paginaRegistrarGerentes = async (req, res = response) => {
    const gerentes = await Gerente.findAll({
        attributes: ['id_grt','nombre', 'ap_paterno', 'ap_materno']
    });

    console.log(gerentes)

    res.render("registrar_gerentes", {
        pagina: "Registrar gerentes",
        gerentes
    });
};

//Registrar
const registrarGerente = async (req, res) => {
    const {id_grt, nombre, ap_paterno, ap_materno, telefono} = req.body;
    const errores = [];

    console.log(req.body);

    if(nombre.trim() === "") {
        errores.push({ mensaje: "El nombre no debe ser vacio"});
    }
    if(ap_paterno.trim() ==="") {
        errores.push({ mensaje: "El apellido paterno no debe estar vacío"} );
    }
    if(telefono.trim() ===""){
        errores.push({ mensaje: "El teléfono no debe estar vacío"});
    }
    if(errores.length > 0){
        res.render("consultar_hoteles", {
            pagina: "Consultar Hoteles", 
            errores,
            nombre, 
            ap_paterno, 
            ap_materno, 
            telefono
        });
    } else {
        console.log(id_grt);
        if(id_grt > 0){
            //Actualizar
            console.log("actualizar");
            try {
                await Gerente.update({
                    nombre, 
                    ap_paterno, 
                    ap_materno, 
                    telefono
                },{where: {id_grt:id_grt}});
                res.redirect('/gerentes');
            }   catch(error) {
                console.log(error);
            }
        }else{
            //almacenar en la base de datos
            try {
                await Gerente.create({
                    nombre, 
                    ap_paterno, 
                    ap_materno, 
                    telefono
                });
                res.redirect('/gerentes');
            } catch(error) {
                console.log(error);
            }
        }
    }
}

//Modificar
const modificarGerentes = async (req, res) =>{
    //Con req.query.id utilizamos la llave para saber cual id y traer la informacion de ese id 
    console.log('Listo '+ req.query.id)
    try {
        //findByPk hace query con el id y trae datos 
      const gerente = await Gerente.findByPk(req.query.id);

      const errores = [];
      res.render("gerentes",{
        pagina: "Gerentes",
        errores,
        id_grt: gerente.id_grt,
        nombre: gerente.nombre,
        ap_paterno: gerente.ap_paterno,
        ap_materno: gerente.ap_materno,
        telefono: gerente.telefono
      });

    } catch (error) {
      console.log(error);
    }
}

//Actualizar


//Eliminar
const eliminarGerente = async (req, res) => {
    console.log('Listo para borrar ' + req.query.id);
        //Eliminar en la base de datos
        try {
            await Hotel.destroy({
                where: {
                        id_htl: req.query.id,
                }
            }
        );
            res.redirect("/consultarHoteles");
        }   catch(error) {
            console.log(error);
        }
    
};

export {
    paginaGerentes,
    registrarGerente,
    paginaRegistrarGerentes,
    paginaRegistrarHoteles,
    modificarGerentes,
    eliminarGerente
}
