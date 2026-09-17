// =====================================================================
//  src/seed.js  —  PUNTO 1.3 de la consigna
//
//  Correlo así:   npm run seed
// =====================================================================

import mongoose from "mongoose";
import { conectarDB } from "./db.js";
import Autor from "./models/autor.js";
import Libro from "./models/libro.js";
import Usuario from "./models/usuario.js";
import Carrito from "./models/carrito.js";
import Pedido from "./models/pedido.js";

await conectarDB();

// Se borra de afuera hacia adentro: pedidos y carritos apuntan a libros y usuarios,
// y los libros apuntan a los autores.
await Pedido.deleteMany({});
await Carrito.deleteMany({});
await Libro.deleteMany({});
await Autor.deleteMany({});
await Usuario.deleteMany({});
console.log("🧹 Colecciones vaciadas");

// syncIndexes crea de verdad los indices unique (isbn, email, carrito.usuario)
await Autor.syncIndexes();
await Libro.syncIndexes();
await Usuario.syncIndexes();
await Carrito.syncIndexes();
await Pedido.syncIndexes();

const [cortazar, borges, puig, arlt, benedetti] = await Autor.create([
    { nombre: "Julio Cortázar",    nacionalidad: "argentina", nacimiento: 1914 },
    { nombre: "Jorge Luis Borges", nacionalidad: "argentina", nacimiento: 1899 },
    { nombre: "Manuel Puig",       nacionalidad: "argentina", nacimiento: 1932 },
    { nombre: "Roberto Arlt",      nacionalidad: "argentina", nacimiento: 1900 },
    { nombre: "Mario Benedetti",   nacionalidad: "uruguaya",  nacimiento: 1920 }
]);

// precio y stock son obligatorios en el modelo: sin ellos el seed corta.
// El stock va variado a proposito, para poder probar los casos de la clase:
// stock 1 -> el 409 de "stock insuficiente" · stock 0 + no disponible -> no se puede agregar
await Libro.create([
    { titulo: "Rayuela",           isbn: "978-84-376-0001", genero: "novela", anio: 1963, precio: 25000, stock: 10, autor: cortazar._id  },
    { titulo: "Ficciones",         isbn: "978-84-376-0002", genero: "cuento", anio: 1944, precio: 18000, stock: 5,  autor: borges._id    },
    { titulo: "El Aleph",          isbn: "978-84-376-0003", genero: "cuento", anio: 1949, precio: 22000, stock: 3,  autor: borges._id,    disponible: false },
    { titulo: "Boquitas pintadas", isbn: "978-84-376-0004", genero: "novela", anio: 1969, precio: 20000, stock: 4,  autor: puig._id      },
    { titulo: "Los siete locos",   isbn: "978-84-376-0005", genero: "novela", anio: 1929, precio: 15000, stock: 1,  autor: arlt._id      },
    { titulo: "La tregua",         isbn: "978-84-376-0006", genero: "novela", anio: 1960, precio: 17000, stock: 0,  autor: benedetti._id, disponible: false }
]);

// el modelo pide apellido: sin el, tambien corta
await Usuario.create([
    { nombre: "Ana",   apellido: "Gómez", email: "ana.gomez@mail.com"  },
    { nombre: "Bruno", apellido: "Díaz",  email: "bruno.diaz@mail.com" }
]);

console.log(`🌱 ${await Autor.countDocuments()} autores y ${await Libro.countDocuments()} libros`);
console.log("   genero     : novela 4 · cuento 2");
console.log("   disponible : true 4 · false 2");
console.log("   autor      : Borges 2 · el resto 1 cada uno");
console.log("   stock      : 10 · 5 · 3 · 4 · 1 · 0");
console.log(`   usuarios   : ${await Usuario.countDocuments()}`);

await mongoose.connection.close();
