// Quiero tener un listado de continentes
// Quiero saber a que continente pertenece un pais

type Continente =
  | "Oceania"
  | "Asia"
  | "América"
  | "Africa"
  | "Europa"
  | "Antartida";

type NombreMarcaAutomotriz =
  | "Alfa Romeo"
  | "Aston Martin"
  | "Audi"
  | "BMW"
  | "Chevrolet"
  | "Citroën"
  | "Dodge"
  | "Ferrari"
  | "Fiat"
  | "Ford"
  | "Honda"
  | "Hyundai"
  | "Jaguar"
  | "Jeep"
  | "Kia"
  | "Lamborghini"
  | "Land Rover"
  | "Maserati"
  | "Mazda"
  | "Mercedes-Benz"
  | "Nissan"
  | "Peugeot"
  | "Porsche"
  | "Renault"
  | "Subaru"
  | "Suzuki"
  | "Tesla"
  | "Toyota"
  | "Volkswagen"
  | "Volvo";

class Nacionalidad {
  nHabitantes: number;
  codPais: string;
  continente: Continente;
  nombre: string;

  constructor(
    nHabitantes: number,
    codPais: string,
    continente: Continente,
    nombre: string,
  ) {
    this.nHabitantes = nHabitantes;
    this.codPais = codPais;
    this.continente = continente;
    this.nombre = nombre;
  }
}

let alemania = new Nacionalidad(80000000, "GER", "Europa", "Alemania");

// Armar un auto y vamos a tener composicion en varios de sus atributos

class Marca {
  nombre: NombreMarcaAutomotriz;
  nacionalidad: Nacionalidad;

  constructor(nombre: NombreMarcaAutomotriz, nacionalidad: Nacionalidad){
    this.nombre = nombre;
    this.nacionalidad = nacionalidad;
  }
}

let bmw = new Marca("BMW", alemania)
let volkswagen = new Marca("Volkswagen", alemania)

// Quiero armar autos y personalizarlos
type Color = "Rojo" | "Verde" | "Negro" | "Azul" | "Gris"

class Auto{
    marca: Marca;
    color: Color;
    modelo: string;

    constructor(marca: Marca,
    color: Color,
    modelo: string){
        this.marca = marca;
        this.color = color;
        this.modelo = modelo;
    }
}

let e30 = new Auto(bmw, "Negro", "E30")
let gol = new Auto(volkswagen, "Gris", "gol")
console.log(e30.marca.nacionalidad.continente)