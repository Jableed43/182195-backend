// Tipos de datos
let edad: number = 33
let verdadero: boolean = false
let nombre: string = "javier"


// Tipado generico de array
let frutas2 : Array<string>

// Tipo any
let valor
valor = "hola"
valor = 2

// forzar tipo any -> tipado dinamico
let valorDinamico: any
valorDinamico = true
valorDinamico = 10
valorDinamico = ""
valorDinamico = undefined
valorDinamico = null

// variable mixta
let valorMixto: (string | null)

// Array
// Tipado común de array
// Este es un array de string
let nombres: string[] = ["juan", "javier", "agustin"]
// Este es un array de number
let numeros: number[] = [1,23,4,7]

// ¿Que pasa si queremos guardar mas de un tipo de datos en un array?
let mixto: (string | number | boolean)[] = [1,2,3,4,5, "sty", false, true, "asd", 2]
// Como tener un array de arrays?
let matriz: number[][] = [
    [1,2,3], // Fila 0
    [4,5,6], // Fila 1
    [7,8,9] // Fila 2
]

// let matriz: number[][] = [ [1,2,3], [4,5,6], [7,8,9] ]

console.log(matriz[1][1])


