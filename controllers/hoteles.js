import { Hotel } from "../models/Hoteles.js"
import { Gerente } from "../models/Gerentes.js"

const registrarHotel = async (req, res) => {
    const {id_htl, nombre, direccion, telefono, correo, id_grt} = req.body;
    const errores = [];

    console.log(req.body);

    if(nombre.trim() === "") {
        errores.push({ mensaje: "El nombre no debe ser vacio"});
    }
    if(direccion.trim() ==="") {
        errores.push({ mensaje: "La direccion no debe ser vacio"} );
    }
    if(telefono.trim() ===""){
        errores.push({ mensaje: "La opinion no debe estar vacia"});
    }
    if(correo.trim() ===""){
        errores.push({ mensaje: "La opinion no debe estar vacia"});
    }
    if(id_grt === undefined  ){
        errores.push({ mensaje: "El gerente no debe estar vacia"});
    }
    if(errores.length > 0){
        res.render("consultar_hoteles", {
            pagina: "Consultar Hoteles", 
            errores,
            nombre,
            direccion,
            telefono,
            correo,
            id_grt
        });
    } else {
        console.log(id_htl);
        if(id_htl > 0){
            //Actualizar
            console.log("actualizar");
            try {
                await Hotel.update({
                    nombre, 
                    direccion,
                    telefono,
                    correo,
                    id_grt
                },{where: {id_htl:id_htl}});
                res.redirect('/consultarHoteles');
            }   catch(error) {
                console.log(error);
            }
        }else{
            //almacenar en la base de datos
            try {
                await Hotel.create({
                    nombre, 
                    direccion,
                    telefono,
                    correo,
                    id_grt
                });
                res.redirect('/consultarHoteles');
            } catch(error) {
                console.log(error);
            }
        }
    }
}

const paginaConsultarHoteles = async (req, res = response) => {
    const hoteles = await Hotel.findAll( {
        include: {
            model: Gerente
        }
    });

    res.render("consultar_hoteles", {
        pagina: "Consultar Hoteles",
        hoteles
    })
};

const modificarHoteles = async (req, res) =>{
    //Con req.query.id utilizamos la llave para saber cual id y traer la informacion de ese id 
    console.log('Listo '+ req.query.id)
    try {
        //findByPk hace query con el id y trae datos 
      const hotel = await Hotel.findByPk(req.query.id);
      const gerente = await Gerente.findByPk(hotel.id_grt);

      const gerentes = await Gerente.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
    });

      const errores = [];
      res.render("registrar_hoteles",{
        pagina: "Registrar Hoteles",
        errores,
        id_htl:     hotel.id_htl,
        nombre:     hotel.nombre,
        direccion:  hotel.direccion,
        telefono:   hotel.telefono,
        correo:     hotel.correo,
        id_grt:     hotel.id_grt,
        gerentes,
        gerente_actual:{
            id_grt: gerente.id_grt,
            nombre: gerente.nombre,
            ap_paterno: gerente.ap_paterno,
            ap_materno: gerente.ap_materno
        }
      });

    } catch (error) {
      console.log(error);
    }
}

const eliminarHoteles = async (req, res) => {
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
    registrarHotel,
    paginaConsultarHoteles,
    modificarHoteles,
    eliminarHoteles
}