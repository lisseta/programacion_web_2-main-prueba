import { Gerente } from "../models/Gerentes.js"
import { Habitacion } from "../models/Habitaciones.js"
import { Hotel } from "../models/Hoteles.js"

function relacionHotelGerente() {
    Hotel.belongsTo(Gerente, {foreignKey: "id_grt"});
    Gerente.hasOne(Hotel, {foreignKey: "id_grt"});
}

function relacionHotelHabitaciones() {
    Habitacion.belongsTo(Hotel, {foreignKey:"id_htl"});
    Hotel.hasMany(Habitacion, {foreignKey:"id_htl"});
}

export {
    Gerente,
    Habitacion,
    Hotel,
    relacionHotelGerente,
    relacionHotelHabitaciones
}