// Tipar objetos (literales)

// Inline - Directa
// Pro -> Facil // Contra -> no es practico porque debemos repetir codigo
let persona1 : {
    nombre: string;
    id: number;
    edad: number;
    activo: boolean;
} = {
    nombre: "valentino",
    id: 1,
    edad: 16,
    activo: true
}

// Como armamos nuestro propio tipo de dato? armamos nuestro propio molde
// 1- La mas simple que existe
// no necesariamente para objetos
type Persona = {
    nombre: string;
    id: number;
    edad: number;
    activo: boolean;
} 

// Como la usamos? Instancia -> es lo que sale del molde
let felix: Persona = {
    nombre: "felix",
    id: 2,
    edad: 23,
    activo: true
}

type ID = string | number

type estadoDeCarga = "cargando" | "descargado" | "cargado"

// Interface - Es un contrato o acuerdo de como algo debe ser y se debe cumplir
// Garantiza que se cumplan caractristicas
// La interface puede definir que tenga metodos pero no deben estar implementadas
// La interface no se puede instanciar, solo usa para tipar
// interface solo para objetos
interface Pizza {
    salsa?: boolean,
    masa: boolean,
    queso?: boolean,
    condimentar(condimento: string): string // defino una funcion
}

let pizzaCancha: Pizza = {
    salsa: true,
    masa: true,
    queso: false,
    condimentar: function(condimento :string) {
        return `Ponele ${condimento}`
    }
}

let pizzas : Pizza[] = [
    {
    salsa: true,
    masa: true,
    queso: false,
    condimentar: function(condimento :string) {
        return `Ponele ${condimento}`
    }
},
    {
    salsa: true,
    masa: true,
    queso: false,
    condimentar: function(condimento :string) {
        return `Ponele ${condimento}`
    }
},
]

console.log(pizzaCancha.queso)
console.log(pizzaCancha.condimentar("oregano"))

// Tipar funciones
console.log("----------")

function pizzaFavorita(persona : Persona, pizza: Pizza): string | null {
    if(persona.activo){
       return pizza.condimentar("oregano")
    } else {
        return null
    }
}

function saludar(persona : Persona): string {
    if(persona.activo){
        return `Hola ${persona.nombre} estas activo!!`
    } else {
        return `Hola ${persona.nombre} estas inactivo!!`
    }
}

console.log(pizzaFavorita(felix, pizzaCancha))
console.log(saludar(felix))
