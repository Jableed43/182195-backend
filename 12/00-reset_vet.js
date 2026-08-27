// =====================================================================
//  00 — RESET
//
//  Deja `veterinaria` con los datos completos de la clase.
//  Corré esto si se desordenó algo, o para saltar directo a un bloque
//  sin haber hecho los anteriores.
//
//  Uso:  mongosh < 00-reset.js
//    o:  load("00-reset.js")
// =====================================================================

use("veterinaria");

db.duenio.drop();
db.mascota.drop();


db.duenio.insertMany([
    { _id: 1, nombre: "Mario",   apellido: "Gomez Bolaños",
      email: "mario.gomez@mail.com",  telefono: "0342-5551234" },
    { _id: 2, nombre: "Marcela", apellido: "Diaz",
      email: "marcela.diaz@mail.com", telefono: "11-123456" },
    { _id: 3, nombre: "Lucía",   apellido: "Ferrer",
      email: "lucia.ferrer@mail.com", telefono: "341-4448888" }
]);


db.mascota.insertMany([
    {
        _id: 1,
        nombre: "firulais",
        especie: "perro",
        fecha_nacimiento: ISODate("2023-07-15"),
        raza: "de la india",
        peso: 5.00,
        duenio: { _id: 1, nombre: "Mario", apellido: "Gomez Bolaños" },
        visitas: [
            { fecha: ISODate("2025-03-10"), motivo: "Control anual",
              diagnostico: "Sano", costo: 15000 },
            { fecha: ISODate("2025-06-02"), motivo: "Vacunación",
              diagnostico: "Al día", costo: 9500 }
        ]
    },
    {
        _id: 2,
        nombre: "ponpon",
        especie: "conejo",
        fecha_nacimiento: ISODate("2025-08-01"),
        raza: "conejo blanco",
        peso: 1.50,
        duenio: { _id: 2, nombre: "Marcela", apellido: "Diaz" },
        visitas: []
    },
    {
        _id: 3,
        nombre: "roger",
        especie: "conejo",
        fecha_nacimiento: ISODate("2024-08-01"),
        raza: "conejo negro",
        peso: 2.30,
        duenio: { _id: 2, nombre: "Marcela", apellido: "Diaz" },
        visitas: [
            { fecha: ISODate("2025-05-20"), motivo: "Cojera",
              diagnostico: "Esguince leve", costo: 28500 }
        ]
    },
    {
        // 👇 el del esquema flexible: le faltan campos y tiene otros propios
        _id: 4,
        nombre: "stuart",
        color: "manto negro",
        microchip: true
    }
]);


print("duenio: ",  db.duenio.countDocuments());    // 3
print("mascota: ", db.mascota.countDocuments());   // 4
