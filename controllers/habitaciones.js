import { Habitacion } from "../models/Habitaciones.js"
import { Hotel } from "../models/Hoteles.js";

const registrarHabitaciones = async (req, res) => {
    const {id_hbt, piso, nombre, refrigerador, id_htl} = req.body;
    const errores = [];

    console.log(req.body);

    if(piso.trim() === "") {
        errores.push({ mensaje: "El piso no debe ser vacio"});
    }
    if(nombre.trim() ==="") {
        errores.push({ mensaje: "La nombre no debe ser vacio"} );
    }
    /*if(refrigerador === ){
        errores.push({ mensaje: "El refrigerador no debe estar vacia"});
    }*/
    
    if(id_htl === undefined  ){
        errores.push({ mensaje: "El hotel no debe estar vacia"});
    }
    if(errores.length > 0){
        res.render("consultar_habitaciones", {
            pagina: "Consultar Habitaciones", 
            errores,
            piso,
            nombre,
            refrigerador,
            id_htl
        });
    } else {
        console.log(id_hbt);
        if(id_hbt > 0){
            //Actualizar
            console.log("actualizar");
            try {
                await Habitacion.update({
                    piso, 
                    nombre,
                    refrigerador,
                    id_htl
                },{where: {id_hbt:id_hbt}});
                res.redirect('/consultarHabitaciones');
            }   catch(error) {
                console.log(error);
            }
        }else{
            console.log(id_hbt);
            //almacenar en la base de datos
            try {
                await Habitacion.create({
                    piso, 
                    nombre,
                    refrigerador,
                    id_htl
                });
                res.redirect('/consultarHabitaciones');
            } catch(error) {
                console.log(error);
            }
        }
        
    }
}

const paginaRegistrarHabitaciones = async (req, res = response) => {
    const hoteles = await Hotel.findAll({
        attributes: ['id_htl','nombre']
    });
    
    res.render("registrar_habitaciones", {
        pagina: "Registrar Habitaciones",
        hoteles
    });
};


const paginaConsultarHabitaciones = async (req, res = response) => {
    const habitaciones = await Habitacion.findAll(
    {
        include: {
            model: Hotel
        }
    });

    res.render("consultar_habitaciones", {
        pagina: "Consultar Habitaciones",
        habitaciones
    })
};

const modificarHabitaciones = async (req, res) =>{
    //Con req.query.id utilizamos la llave para saber cual id y traer la informacion de ese id 
    console.log('Listo '+ req.query.id)
    try {
        //findByPk hace query con el id y trae datos 
      const habitacion = await Habitacion.findByPk(req.query.id);
      const hotel = await Hotel.findByPk(habitacion.id_htl);

      console.log(habitacion.refrigerador);

      const hoteles = await Hotel.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo', 'id_grt']
    });

      const errores = [];
      res.render("registrar_habitaciones",{
        pagina: "Registrar Habitaciones",
        errores,
        id_hbt:         habitacion.id_hbt,
        piso:           habitacion.piso,
        nombre:         habitacion.nombre,
        refrigerador:   habitacion.refrigerador,
        id_htl:         habitacion.id_htl,
        hoteles,
        hotel_actual:{
            id_htl: hotel.id_htl,
            nombre: hotel.nombre,
            direccion: hotel.direccion,
            telefono: hotel.telefono,
            correo: hotel.correo,
            id_grt: hotel.id_grt
        }
      });

    } catch (error) {
      console.log(error);
    }
}

const eliminarHabitaciones = async (req, res) => {
    console.log('Listo para borrar ' + req.query.id);
        //Eliminar en la base de datos
        try {
            await Habitacion.destroy({
                where: {
                        id_hbt: req.query.id,
                }
            }
        );
            res.redirect("/consultarHabitaciones");
        }   catch(error) {
            console.log(error);
        }
    
};

export {
    registrarHabitaciones,
    paginaConsultarHabitaciones,
    paginaRegistrarHabitaciones,
    modificarHabitaciones,
    eliminarHabitaciones
}