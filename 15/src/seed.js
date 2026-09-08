// =====================================================================
//  src/seed.js  —  PUNTO 1.3 de la consigna
//
//  Correlo así:   npm run seed
// =====================================================================

import mongoose from "mongoose";
import { conectarDB } from "./db.js";
import Autor from "./models/autor.js";
import Libro from "./models/libro.js";

await conectarDB();

// Primero los libros: apuntan a los autores.
await Libro.deleteMany({});
await Autor.deleteMany({});
console.log("🧹 Colecciones vaciadas");

await Autor.syncIndexes();
await Libro.syncIndexes();

const [cortazar, borges, puig, arlt, benedetti] = await Autor.create([
    { nombre: "Julio Cortázar",    nacionalidad: "argentina", nacimiento: 1914 },
    { nombre: "Jorge Luis Borges", nacionalidad: "argentina", nacimiento: 1899 },
    { nombre: "Manuel Puig",       nacionalidad: "argentina", nacimiento: 1932 },
    { nombre: "Roberto Arlt",      nacionalidad: "argentina", nacimiento: 1900 },
    { nombre: "Mario Benedetti",   nacionalidad: "uruguaya",  nacimiento: 1920 }
]);

await Libro.create([
    { titulo: "Rayuela",           isbn: "978-84-376-0001", genero: "novela", anio: 1963, autor: cortazar._id  },
    { titulo: "Ficciones",         isbn: "978-84-376-0002", genero: "cuento", anio: 1944, autor: borges._id    },
    { titulo: "El Aleph",          isbn: "978-84-376-0003", genero: "cuento", anio: 1949, autor: borges._id,    disponible: false },
    { titulo: "Boquitas pintadas", isbn: "978-84-376-0004", genero: "novela", anio: 1969, autor: puig._id      },
    { titulo: "Los siete locos",   isbn: "978-84-376-0005", genero: "novela", anio: 1929, autor: arlt._id      },
    { titulo: "La tregua",         isbn: "978-84-376-0006", genero: "novela", anio: 1960, autor: benedetti._id, disponible: false }
]);

console.log(`🌱 ${await Autor.countDocuments()} autores y ${await Libro.countDocuments()} libros`);
console.log("   genero     : novela 4 · cuento 2");
console.log("   disponible : true 4 · false 2");
console.log("   autor      : Borges 2 · el resto 1 cada uno");

await mongoose.connection.close();
