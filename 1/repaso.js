// Variables Let var const
// const -> no varia - no se reasigna, redefine ni redeclara
const puerto = 3000;
const frutas = ["manzana", "naranja"];

// let y var -> pueden variar a lo largo de la ejecucion
let fruta = "manzana";
// let fruta = "mandarina"

var verdura = "berenjena";
var verdura = "zapallito";

let persona = {
  nombre: "miguel",
  edad: 19,
  hobbies: ["programacion", "futbol", ["cocinar", "bailar"]],
};

console.log(verdura.length);
console.log(frutas[0]);
console.log(frutas.length);
console.log(persona.nombre);
console.log(persona.hobbies[2][0]);

// Crear una funcion que determine si un estudiante aprobó
function aprobo(nota) {
  // Retorno temprano, sirve para validar todo lo necesario antes de ir a la logica principal
  if (typeof nota !== "number" || nota < 0) {
    // Early return
    return null;
  }

  if (nota >= 6) {
    return true;
  } else {
    return false;
  }
}
// caso desaprobado
console.log(aprobo(1));
// un caso que de error por numero menor a 0
console.log(aprobo(-2));
// otro caso que de error por valor incorrecto
console.log(aprobo("hola"));
// caso aprobado
console.log(aprobo(9));

let alumno = {
  nombre: "javier",
  nota: 2,
  aprobado: null,
};

const alumnos = [
  { nombre: "Walter", nota: 10, aprobado: null },
  { nombre: "Javier", nota: 4, aprobado: null },
  { nombre: "Alanis", nota: 8, aprobado: null },
  { nombre: "Lucas", nota: 8, aprobado: null },
  { nombre: "Sofia", nota: 9, aprobado: null },
  { nombre: "Mateo", nota: 3, aprobado: null },
  { nombre: "Valentina", nota: 7, aprobado: null },
  { nombre: "Diego", nota: 5, aprobado: null },
  { nombre: "Camila", nota: 6, aprobado: null },
  { nombre: "Nicolas", nota: 2, aprobado: null },
  { nombre: "Isabella", nota: 10, aprobado: null },
  { nombre: "Julian", nota: 4, aprobado: null },
  { nombre: "Martina", nota: 8, aprobado: null },
  { nombre: "Sebastian", nota: 1, aprobado: null },
  { nombre: "Luciana", nota: 9, aprobado: null },
  { nombre: "Gabriel", nota: 5, aprobado: null },
  { nombre: "Victoria", nota: 7, aprobado: null },
  { nombre: "Bastian", nota: 3, aprobado: null },
  { nombre: "Antonella", nota: 6, aprobado: null },
  { nombre: "Felipe", nota: 8, aprobado: null },
  { nombre: "Renata", nota: 10, aprobado: null },
  { nombre: "Tomas", nota: 4, aprobado: null },
  { nombre: "Elena", nota: 9, aprobado: null },
  { nombre: "Samuel", nota: 2, aprobado: null },
  { nombre: "Florencia", nota: 7, aprobado: null },
  { nombre: "Iker", nota: 5, aprobado: null },
  { nombre: "Aitana", nota: 8, aprobado: null },
  { nombre: "Agustin", nota: 6, aprobado: null },
  { nombre: "Micaela", nota: 3, aprobado: null },
  { nombre: "Joaquin", nota: 9, aprobado: null },
  { nombre: "Delfina", nota: 4, aprobado: null },
  { nombre: "Santiago", nota: 7, aprobado: null },
  { nombre: "Zoe", nota: 10, aprobado: null },
  { nombre: "Benjamin", nota: 5, aprobado: null },
];

// Y si quiero el array con los alumnos completos con la propiedad aprobado en true/false?
// map toma un array, pasa cada item y le aplica una funcion/metodo, como salida genera un nuevo array
let resultado = alumnos.map(function (alumno) {
  // Le asigno el boolean a la propiedad aprobado
  alumno.aprobado = aprobo(alumno.nota);
  // devuelvo el alumno completo con su nueva propiedad
  return alumno;
});
console.log({ resultado });

// Quiero obtener los alumnos aprobados
// Filter, filtra. Crea un array con los items que cumplan con el predicado/condicion
let aprobados = resultado.filter((alumno) => aprobo(alumno.nota));
console.log(aprobados);

// Quiero obtener los alumnos desaprobados
let desaprobados = resultado.filter((alumno) => !aprobo(alumno.nota));
console.log(desaprobados);

/* Quiero calcular el promedio de las notas de los estudiantes */
function calcularPromedio(alumnos) {
  // Acumulador es quien guarda los valores que se van sumando
  // alumno es el valor actual que debo sumar a mi acumulador
  // el 0 es el punto de partida/valor inicial del acumulador
  let sumaNotas = alumnos.reduce(function (acumulador, alumno) {
    return acumulador + alumno.nota;
  }, 0);
  return sumaNotas / alumnos.length;
}

let promedio = calcularPromedio(alumnos)
console.log(Number(promedio.toFixed(2)))

// Cuantas keys tiene un alumno?
let nkeys = Object.keys(alumno).length
console.log(nkeys)

// Metodo -> es una funcion de un objeto
function format(value) {
    if(typeof value === "number"){
        return Number(value.toFixed(2))
    } else {
        return null
    }
}

// Queremos contar los aprobados y los desaprobados
function contarAprobados(alumnos) {
    // Inicializar variables
    let aprobados = 0
    let desaprobados = 0
    let totalAlumnos = alumnos.length

    alumnos.forEach(function(alumno) {
        if(alumno.aprobado){
            aprobados++
        } else {
            desaprobados++
        }
    })

    let promedio = calcularPromedio(alumnos)
    // let promedioF = Number(promedio.toFixed(2))

    return {
        aprobados,
        desaprobados,
        totalAlumnos,
        procentajeAprobados: format(aprobados / totalAlumnos) * 100,
        procentajeDesaprobados: format((desaprobados / totalAlumnos) * 100),
        promedio: format(promedio)
    }
}

console.log(contarAprobados(resultado))
 
// Queremos saber la frecuencia de las notas
// Cuantos sacaron 5, cuantos sacaron 9, cuantos sacaron 10
let frecuencia = {}

resultado.forEach(function(alumno) {
    if(frecuencia[alumno.nota]){
        frecuencia[alumno.nota]++
    } else {
        frecuencia[alumno.nota] = 1
    }
})

let resultado2 = []
for (let nota in frecuencia){
    resultado2.push({
        nota: Number(nota),
        incidencia: frecuencia[nota]
    })
}

console.log(resultado2)