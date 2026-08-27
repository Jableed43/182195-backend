// =====================================================================
//  00 — Crear la base `tienda`
//
//  16 productos. Todos tienen los mismos campos, todos completos.
//
//  Estructura de cada documento:
//      _id          número
//      nombre       texto
//      categoria    texto      (informatica · gaming · audio · hogar)
//      marca        texto
//      precio       número
//      stock        número
//      etiquetas    ARRAY de textos          (2, 3 o 4 por producto)
//      specs        OBJETO anidado           { garantia_meses, color }
//      resenas      ARRAY de objetos         { usuario, puntaje }
//      fecha_alta   fecha
//      activo       booleano
//
//  Se puede correr las veces que haga falta: borra y recrea.
//  Uso: copiá y pegá todo en la consola >_MONGOSH de Compass.
// =====================================================================

use tienda

db.producto.drop();

db.producto.insertMany([
  {
    _id: 1,
    nombre: "Notebook Lenovo IdeaPad",
    categoria: "informatica",
    marca: "Lenovo",
    precio: 850000,
    stock: 12,
    etiquetas: ["notebook", "trabajo", "oficina"],
    specs: { garantia_meses: 24, color: "gris" },
    resenas: [
      { usuario: "ana", puntaje: 5 },
      { usuario: "beto", puntaje: 4 }
    ],
    fecha_alta: ISODate("2025-01-15"),
    activo: true
  },
  {
    _id: 2,
    nombre: "Notebook HP Pavilion",
    categoria: "informatica",
    marca: "HP",
    precio: 720000,
    stock: 7,
    etiquetas: ["notebook", "trabajo"],
    specs: { garantia_meses: 12, color: "plata" },
    resenas: [
      { usuario: "carla", puntaje: 4 },
      { usuario: "dario", puntaje: 4 }
    ],
    fecha_alta: ISODate("2025-02-03"),
    activo: true
  },
  {
    _id: 3,
    nombre: "Mouse Logitech M170",
    categoria: "informatica",
    marca: "Logitech",
    precio: 12000,
    stock: 80,
    etiquetas: ["mouse", "accesorio", "inalambrico"],
    specs: { garantia_meses: 12, color: "negro" },
    resenas: [
      { usuario: "elsa", puntaje: 5 },
      { usuario: "ana", puntaje: 4 },
      { usuario: "beto", puntaje: 5 }
    ],
    fecha_alta: ISODate("2025-01-20"),
    activo: true
  },
  {
    _id: 4,
    nombre: "Teclado Redragon K552",
    categoria: "gaming",
    marca: "Redragon",
    precio: 68000,
    stock: 25,
    etiquetas: ["teclado", "gaming", "accesorio", "rgb"],
    specs: { garantia_meses: 12, color: "negro" },
    resenas: [
      { usuario: "dario", puntaje: 5 },
      { usuario: "elsa", puntaje: 4 }
    ],
    fecha_alta: ISODate("2025-03-11"),
    activo: true
  },
  {
    _id: 5,
    nombre: "Auriculares Sony WH1000",
    categoria: "audio",
    marca: "Sony",
    precio: 340000,
    stock: 9,
    etiquetas: ["auriculares", "inalambrico", "premium"],
    specs: { garantia_meses: 24, color: "negro" },
    resenas: [
      { usuario: "ana", puntaje: 5 },
      { usuario: "carla", puntaje: 5 }
    ],
    fecha_alta: ISODate("2025-02-18"),
    activo: true
  },
  {
    _id: 6,
    nombre: "Parlante JBL Flip 6",
    categoria: "audio",
    marca: "JBL",
    precio: 125000,
    stock: 30,
    etiquetas: ["parlante", "inalambrico", "portatil"],
    specs: { garantia_meses: 12, color: "azul" },
    resenas: [
      { usuario: "beto", puntaje: 4 },
      { usuario: "dario", puntaje: 3 }
    ],
    fecha_alta: ISODate("2025-01-05"),
    activo: true
  },
  {
    _id: 7,
    nombre: "Monitor Samsung 24",
    categoria: "informatica",
    marca: "Samsung",
    precio: 290000,
    stock: 15,
    etiquetas: ["monitor", "oficina"],
    specs: { garantia_meses: 36, color: "negro" },
    resenas: [
      { usuario: "carla", puntaje: 4 },
      { usuario: "elsa", puntaje: 3 }
    ],
    fecha_alta: ISODate("2025-03-22"),
    activo: true
  },
  {
    _id: 8,
    nombre: "Silla Gamer Xtreme",
    categoria: "gaming",
    marca: "Xtreme",
    precio: 195000,
    stock: 6,
    etiquetas: ["silla", "gaming", "ergonomica"],
    specs: { garantia_meses: 24, color: "rojo" },
    resenas: [
      { usuario: "ana", puntaje: 3 },
      { usuario: "dario", puntaje: 4 }
    ],
    fecha_alta: ISODate("2025-04-02"),
    activo: true
  },
  {
    _id: 9,
    nombre: "Cafetera Philips 3200",
    categoria: "hogar",
    marca: "Philips",
    precio: 95000,
    stock: 20,
    etiquetas: ["cocina", "electrodomestico"],
    specs: { garantia_meses: 24, color: "plata" },
    resenas: [
      { usuario: "elsa", puntaje: 5 },
      { usuario: "beto", puntaje: 4 }
    ],
    fecha_alta: ISODate("2025-02-27"),
    activo: true
  },
  {
    _id: 10,
    nombre: "Aspiradora Xiaomi G10",
    categoria: "hogar",
    marca: "Xiaomi",
    precio: 430000,
    stock: 11,
    etiquetas: ["limpieza", "electrodomestico", "inalambrico"],
    specs: { garantia_meses: 12, color: "blanco" },
    resenas: [
      { usuario: "carla", puntaje: 5 },
      { usuario: "ana", puntaje: 4 }
    ],
    fecha_alta: ISODate("2025-04-15"),
    activo: true
  },
  {
    _id: 11,
    nombre: "Webcam Genius HD",
    categoria: "informatica",
    marca: "Genius",
    precio: 38000,
    stock: 40,
    etiquetas: ["webcam", "accesorio"],
    specs: { garantia_meses: 12, color: "negro" },
    resenas: [
      { usuario: "dario", puntaje: 3 },
      { usuario: "elsa", puntaje: 3 }
    ],
    fecha_alta: ISODate("2025-01-28"),
    activo: false
  },
  {
    _id: 12,
    nombre: "Joystick Xbox Series",
    categoria: "gaming",
    marca: "Microsoft",
    precio: 110000,
    stock: 18,
    etiquetas: ["joystick", "gaming", "inalambrico"],
    specs: { garantia_meses: 12, color: "blanco" },
    resenas: [
      { usuario: "ana", puntaje: 4 },
      { usuario: "beto", puntaje: 5 }
    ],
    fecha_alta: ISODate("2025-03-05"),
    activo: true
  },
  {
    _id: 13,
    nombre: "Microfono Blue Yeti",
    categoria: "audio",
    marca: "Blue",
    precio: 280000,
    stock: 5,
    etiquetas: ["microfono", "streaming", "premium"],
    specs: { garantia_meses: 24, color: "gris" },
    resenas: [
      { usuario: "carla", puntaje: 5 },
      { usuario: "dario", puntaje: 5 }
    ],
    fecha_alta: ISODate("2025-04-20"),
    activo: true
  },
  {
    _id: 14,
    nombre: "Notebook Gamer Asus ROG",
    categoria: "gaming",
    marca: "Asus",
    precio: 1850000,
    stock: 3,
    etiquetas: ["notebook", "gaming", "premium", "rgb"],
    specs: { garantia_meses: 36, color: "negro" },
    resenas: [
      { usuario: "beto", puntaje: 5 },
      { usuario: "elsa", puntaje: 5 }
    ],
    fecha_alta: ISODate("2025-04-28"),
    activo: true
  },
  {
    _id: 15,
    nombre: "Cable HDMI 2m",
    categoria: "informatica",
    marca: "Generica",
    precio: 8500,
    stock: 100,
    etiquetas: ["cable", "accesorio"],
    specs: { garantia_meses: 6, color: "negro" },
    resenas: [
      { usuario: "ana", puntaje: 3 },
      { usuario: "carla", puntaje: 4 }
    ],
    fecha_alta: ISODate("2025-01-10"),
    activo: true
  },
  {
    _id: 16,
    nombre: "Batidora Philips Daily",
    categoria: "hogar",
    marca: "Philips",
    precio: 52000,
    stock: 22,
    etiquetas: ["cocina", "electrodomestico"],
    specs: { garantia_meses: 12, color: "blanco" },
    resenas: [
      { usuario: "elsa", puntaje: 4 },
      { usuario: "beto", puntaje: 3 }
    ],
    fecha_alta: ISODate("2025-03-30"),
    activo: true
  }
]);

// ---------------------------------------------------------------------
//  Verificación
// ---------------------------------------------------------------------

db.producto.countDocuments();
// 👀 16

db.producto.findOne({ _id: 1 });
// 👀 Mirá la forma del documento:
//      · `specs`    es un OBJETO anidado
//      · `etiquetas` es un ARRAY de textos
//      · `resenas`   es un ARRAY de OBJETOS
//
//    Un documento puede contener otros documentos y listas adentro.
//    Una fila de una tabla no puede.


// ---------------------------------------------------------------------
//  Un vistazo general antes de empezar
// ---------------------------------------------------------------------

db.producto.find({}, { nombre: 1, categoria: 1, precio: 1, stock: 1, _id: 0 });
// 👀 16 productos repartidos en 4 categorías:
//      informatica  6
//      gaming       4
//      audio        3
//      hogar        3
